import React from 'react';
import { Container, Image } from 'react-bootstrap';
import coffeeBeanMugImg from '../../img/coffee-beans-mug.jpg';

const Home = () => {
  return (
    <Container className="p-5 border rounded-3 bg-dark">
      <h1>COFFEEHOLIC</h1>
      <Image rounded fluid src={coffeeBeanMugImg} width="100%" height="30%" />
    </Container>
  );
};

export default Home;
