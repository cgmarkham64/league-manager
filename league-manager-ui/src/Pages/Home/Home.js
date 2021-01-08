import React from "react";
import {Button, Card, Carousel, Container, Col, Row} from "react-bootstrap";
import {axios} from "axios";

import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <Container fluid className="page-container">
        <Row className="page-row">
          <Col>
            <Carousel className="home-carousel">
              {/* Carousel image size is 1880x840 */}
              <Carousel.Item className="carousel-item-panel">
                <img className="carousel-image" src={window.location.origin + "/resources/register_now.jpg"} alt="Player Sign Up"/>
                <Carousel.Caption className="home-carousel-caption" style={{right:"0px", left: "0px", bottom: "0px"}}>
                  <h3>Sign Up to Play</h3>
                  <p>Have you ever felt like you can't find sporting or gaming events to participate in?
                    <Button className="carousel-content-button" variant="primary" href="leagues">
                      Join!
                    </Button>
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="carousel-item-panel">
                <img className="carousel-image" src={window.location.origin + "/resources/college_baseball.jpg"} alt="Create a League"/>
                <Carousel.Caption className="home-carousel-caption" style={{right:"0px", left: "0px", bottom: "0px"}}>
                  <h3>League Management</h3>
                  <p>Your league's single source for scheduling, statistic tracking, payment and more!
                    <Button className="carousel-content-button" variant="primary" href="leagues">
                      Create a League
                    </Button>
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="page-row" fluid="mda">
          {/* Card image size is 620x780 */}
          <Col md>
            <Card className="main-page-card" bg="secondary" text="white">
              <Card.Img variant="top" src={window.location.origin + "/resources/news_example.jpeg"}/>
              <Card.Body>
                <Card.Title>News</Card.Title>
                <Card.Text>
                  Find out what has been going on with League Manager!
                </Card.Text>
                <Button variant="primary">What's the News?</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card className="main-page-card" bg="secondary" text="white">
              <Card.Img variant="top" src={window.location.origin + "/resources/league_organization.jpg"} />
              <Card.Body>
                <Card.Title>Create a League</Card.Title>
                <Card.Text>
                  Organize teams, adjust schedules, and process payments for your league
                </Card.Text>
                <Button variant="primary">League Management</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card className="main-page-card" bg="secondary" text="white">
              <Card.Img variant="top" src={window.location.origin + "/resources/league_roster.jpeg"} />
              <Card.Body>
                <Card.Title>Manage Your Team</Card.Title>
                <Card.Text>
                  Plan for your next win by adjusting your team's roster and viewing stats
                </Card.Text>
                <Button variant="primary">Team Management</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card className="main-page-card" bg="secondary" text="white">
              <Carousel
                  indicators={false}
                  controls={false}
                  style={{margin: "0px", padding: "0px", width: "100%"}}
                  interval={3000}>
                <Carousel.Item>
                  <img className="player-carousel-image" src={window.location.origin + "/resources/youth_baseball.jpg"} alt="Youth Baseball"/>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="player-carousel-image" src={window.location.origin + "/resources/college_basketball.jpg"} alt="College Basketball"/>
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card.Title>Player Portal</Card.Title>
                <Card.Text>
                  See individual player stats, manage payments, and sign up to play!
                </Card.Text>
                <Button variant="primary">Player Management</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home;
