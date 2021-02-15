import React from "react";

import "./Leagues.css";
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";
import {database_URL} from "../../constants";

class Leagues extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedLeague: null,
      leaguesList: [],
      leaguesListTableBody: null,
      leagueTeamMap: {},
      leagueCommissionerMap: {}
    };

    this.createNewLeague = this.createNewLeague.bind(this);
    this.editLeague = this.editLeague.bind(this);
    this.deleteLeague = this.deleteLeague.bind(this);
  }

  componentDidMount() {
    this.getLeaguePageDataFromDb();
  }

  /**
   * Retrieves all the leagues, teams, and commissioners in the League Manager application for display in Leagues Table
   */
  getLeaguePageDataFromDb = () => {
    axios.get(`${database_URL}/api/leagues`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      const leaguesList = response.data.data;
      let leagueCommissionerMap = {};
      let leagueTeamMap = {};

      leaguesList.forEach(league => {
        let commissionerId = league.commissioner
        axios.get(`${database_URL}/api/user/${commissionerId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(commissionerResponse => {
          // set league commissioner map to the actual user object
          leagueCommissionerMap[league._id] = commissionerResponse.data.data;

          league.teams.forEach(teamId => {
            // create league -> team map object if doesn't exist
            if(leagueTeamMap[league._id] === undefined){
              leagueTeamMap[league._id] = [];
            }
            // get team from DB and insert it into the leagueTeamMap object
            axios.get(`${database_URL}/api/team/${teamId}`, {
              headers: {
                'Content-Type': 'application/json',
              }
            }).then(teamResponse => {
              const team = teamResponse.data.data;
              leagueTeamMap[league._id].push(team);
              this.setState({leaguesList: leaguesList, leagueTeamMap: leagueTeamMap, leagueCommissionerMap: leagueCommissionerMap}, () => {
                this.updateLeaguesListTable();
              });
            });
          });
        });
      });
    });
  }

  /**
   * Update the leagues table with latest league and team info
   */
  updateLeaguesListTable = () => {
    let returnBody = null;
    // create leagues table body with league info and pre retrieved team info
    this.state.leaguesList.forEach(league => {
      let commissioner = this.state.leagueCommissionerMap[league._id];
      let teams = this.state.leagueTeamMap[league._id];
      returnBody = (<tr key={league._id}>
        <td>{league.name}</td>
        <td>{`${commissioner.firstName} ${commissioner.lastName}`}</td>
        <td>{league.sport}</td>
        <td>{teams.map(team => <ul key={team._id}>{team.name}</ul>)}</td>
      </tr>);
    });
    this.setState({leaguesListTableBody: returnBody});
  }

  /**
   * Create a new league
   */
  createNewLeague = () => {
    // TODO create new league
    console.log("creating new league... TODO");
  }

  /**
   * Edit a league
   * @param league
   */
  editLeague = (league) => {
    // TODO edit league
    console.log("Editing League...", league);
    axios.post(`${database_URL}/api/updateLeague`, {
      id: league.id,
      league: league,
    }).then(() => {
      this.getLeaguePageDataFromDb();
    });
  }

  /**
   * Delete a league
   * @param league
   */
  deleteLeague = (league) => {
    // TODO delete league
    console.log("Deleting League... TODO", league);
  }

  render() {
    return (<Container fluid className="page-container">
      <div>Leagues Page Content - TEMP testing CRUD functionality</div>
      <div>TODO TABLE OF LEAGUES & SEARCH FUNCTIONALITY TODO</div>
      <Button variant="primary" onClick={() => this.createNewLeague()}>Create League</Button>
      <Button variant="secondary" onClick={() => this.editLeague(this.state.selectedLeague)}>Edit League</Button>
      <Button variant="warning" onClick={() => this.deleteLeague(this.state.selectedLeague)}>Delete League</Button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Commissioner</th>
            <th>Sport</th>
            <th>Teams</th>
          </tr>
        </thead>
        <tbody>
          {this.state.leaguesListTableBody}
        </tbody>
      </Table>
    </Container>)
  }
}

export default Leagues;
