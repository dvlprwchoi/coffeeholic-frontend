import React from 'react';
import { Container, Image } from 'react-bootstrap';
import coffeeBeansImg from '../../img/coffee-beans.jpg';

const About = () => {
  return (
    <Container className="about p-5 border rounded-3 bg-dark">
      <h1>About COFFEEHOLIC</h1>
      <div className="imgDiv">
        <Image rounded fluid src={coffeeBeansImg} width="100%" height="30%" />
      </div>
      <div className="textDiv">
        As a coffee lover, when I'm in town or traveling outside of town, I
        always like to visit local coffee roasters. This application will allow
        you to post your favorite coffee shops with pictures and maps.
      </div>
    </Container>
  );
};

export default About;
