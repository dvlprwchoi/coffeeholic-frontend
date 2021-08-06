import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import { Container } from 'react-bootstrap';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} />
      Hello World
      <Container>
        <Switch>
          <Route path="/login" render={() => <Login />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
