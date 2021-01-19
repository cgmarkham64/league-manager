import React from "react";
import {Button, Card, Carousel, Container, Col, Row} from "react-bootstrap";
import axios from "axios";

import "./Home.css";

class Home extends React.Component {
  // initialize component state
  state = {
    carouselContent: [],
    cardContent: [],
  };

  // I'm one with the data, the data is with me
  componentDidMount() {
    this.getDataFromDb();
  }

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    axios.get(`http://localhost:4000/api/getPageContent`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      const contentArray = response.data.data;
      let tempCarousel = [];
      let tempCards = [];
      contentArray.forEach(contentItem => {
        switch(contentItem.position){
          case "carousel":
            tempCarousel.push(contentItem);
            break;
          case "cards":
            tempCards.push(contentItem);
            break;
          default:
            throw new Error(`Unknown position for item ${contentItem}`);
        }
      });
      this.setState({carouselContent: tempCarousel});
      this.setState({cardContent: tempCards});
    });
  }

  render() {
    return (
      <Container fluid className="page-container">
        <Row className="page-row">
          <Col>
            <Carousel className="home-carousel">
              {this.state.carouselContent.map(carouselItem => (
                  <Carousel.Item className={"carousel-item-panel"} key={carouselItem._id}>
                    <img className="carousel-image" src={window.location.origin + carouselItem.imageRef[0]}/>
                    <Carousel.Caption className="home-carousel-caption" style={{right:"0px", left: "0px", bottom: "0px"}}>
                      <h3>{carouselItem.title}</h3>
                      <p>{carouselItem.description}
                        <Button className="carousel-content-button" variant={carouselItem.buttonType} href="leagues">
                          {carouselItem.buttonText}
                        </Button>
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row className="page-row" fluid="mda">
          {this.state.cardContent.map(cardItem => (
            <Col md key={cardItem._id}>
              <Card className="main-page-card" bg="secondary" text="white">
                {cardItem.imageRef.length > 1 ? (<Carousel indicators={false} controls={false} style={{margin: "0px", padding: "0px", width:"100%"}} interval={3000}>
                  {cardItem.imageRef.map((imageRefString, idx) => (
                      <Carousel.Item>
                        <img className="player-carousel-image" src={window.location.origin + imageRefString} key={idx}/>
                      </Carousel.Item>
                  ))}
                </Carousel>) : <Card.Img variant="top" src={window.location.origin + cardItem.imageRef[0]}/>}
                <Card.Body>
                  <Card.Title>{cardItem.title}</Card.Title>
                  <Card.Text>
                    {cardItem.description}
                  </Card.Text>
                  <Button variant={cardItem.buttonType}>{cardItem.buttonText}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}

export default Home;
