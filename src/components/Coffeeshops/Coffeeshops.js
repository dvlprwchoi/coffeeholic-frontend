import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';

const Coffeeshops = ({ loggedIn }) => {
  const [coffeeshops, setCoffeeshops] = useState([]);

  const getCoffeeshopsIndex = async () => {
    try {
      const response = await fetch('http://localhost:8000/coffeeholic/');
      const data = await response.json();
      console.log(data);
      setCoffeeshops(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCoffeeshopsIndex();
  }, []);

  if (!coffeeshops.length) {
    return null;
  }

  return (
    <Container>
      <h3>Coffee Shops</h3>
      {loggedIn && (
        <Link to="coffeeshops/new">
          <Button>Add a coffee shop</Button>
        </Link>
      )}
      <CardGroup>
        <Row>
          {coffeeshops.map((coffeeshop) => {
            return (
              <Col key={coffeeshop.id}>
                <Link
                  to={`coffeeshops/${coffeeshop.id}`}
                  style={{ color: 'brown', textDecoration: 'none' }}
                >
                  <Card>
                    <Card.Img variant="top" src={coffeeshop.photo_url} />
                    <Card.Body>
                      <Card.Title>{coffeeshop.name}</Card.Title>
                      {/* <Card.Text>
                        Number of reviews: {coffeeshop.reviews.length}
                      </Card.Text> */}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </CardGroup>
    </Container>
  );
};

export default Coffeeshops;
