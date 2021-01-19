import React from "react";

import "./Leagues.css";
import {Container, Button} from "react-bootstrap";

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
    </Container>)
  }
}

export default Leagues;
