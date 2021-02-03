import React from "react";

import "./Leagues.css";
import {Container, Button, Table} from "react-bootstrap";
import axios from "axios";
import {database_URL} from "../../constants";

class Leagues extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedLeague: null,
      leaguesList: [],
      teamsMap: {}
    };

    this.createNewLeague = this.createNewLeague.bind(this);
    this.editLeague = this.editLeague.bind(this);
    this.deleteLeague = this.deleteLeague.bind(this);
  }

  componentDidMount() {
    this.getLeaguesFromDb();
    // axios.get(`${database_URL}/api/league/601844d91ac44e2c2187e1fe`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // }).then(response => {
    //   console.log("GOT a LEAGUES??? ", response);
    // })
  }

  getLeaguesFromDb = () => {
    axios.get(`${database_URL}/api/leagues`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log("response leagues is ", response);
      const tempLeaguesList = response.data.data;
      let tempTeamsMap = {...this.state.teamsMap};
      tempLeaguesList.forEach(league => {
        if(tempTeamsMap[league._id]) {

        } else {
          tempTeamsMap[league._id] = {};
          league.teams.forEach(teamId => {
            // get each team and write to tempTeamsMap object as mapped object teamId -> team
            axios.get(`${database_URL}/api/team/${teamId}`, {
              headers: {
                'Content-Type': 'application/json',
              }
            }).then(teamsResponse => {
              console.log("teamsResponse is ", teamsResponse);
            });
          });
        }
      });



      this.setState({leaguesList: tempLeaguesList});
    });
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
      this.getLeaguesFromDb();
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
          <th>Name</th>
          <th>Commissioner</th>
          <th>Sport</th>
          <th>Teams</th>
        </thead>
        <tbody>
          {this.state.leaguesList.map(league => (
              <tr key={league._id}>
                <td>{league.name}</td>
                <td>{league.commissioner}</td>
                <td>{league.sport}</td>
                <td>{league.teams.map(teamId => {
                  return <ul key={teamId}>{teamId}</ul>;
                })}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </Container>)
  }
}

export default Leagues;
