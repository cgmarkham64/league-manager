import React from "react";

import "./Leagues.css";
import {Container, Button, Table} from "react-bootstrap";
import axios from "axios";
import {database_URL} from "../../constants";

class Leagues extends React.Component {
  state = {
    selectedLeague: null,
    leaguesList: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedLeague: null,
      leaguesList: [],
    };

    this.createNewLeague = this.createNewLeague.bind(this);
    this.editLeague = this.editLeague.bind(this);
    this.deleteLeague = this.deleteLeague.bind(this);
  }

  componentDidMount() {
    this.getLeaguesFromDb();
  }

  getLeaguesFromDb = () => {
    axios.get(`${database_URL}/api/leagues`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log("response leagues is ", response);
      this.setState({leaguesList: response.data.data});
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
    console.log("Editing League... TODO", league);
    axios.post('http://localhost:3001/api/putData', {
      id: league.id,
      league: league,
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
              <tr>
                <td>{league.name}</td>
                <td>{league.commissioner}</td>
                <td>{league.sport}</td>
                <td>{league.teams.map(team => {
                  return <ul>{team}</ul>;
                })}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </Container>)
  }
}

export default Leagues;
