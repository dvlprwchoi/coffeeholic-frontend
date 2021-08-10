import React from 'react';
import { Container, Image } from 'react-bootstrap';
import coffeeBeanImg from '../../img/coffee-beans.jpg';

const Home = () => {
  return (
    <Container className="p-5 border rounded-3 bg-light">
      <h1>Coffee Holic</h1>
      <Image rounded fluid src={coffeeBeanImg} />
    </Container>
  );
};

export default Home;
