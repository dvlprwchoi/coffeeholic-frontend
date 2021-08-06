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

  // Handler function for local storage
  const _handleSetLogIn = (authToken) => {
    setLoggedIn(true);
    localStorage.setItem('token', authToken);
  };

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} />
      Hello World
      <Container>
        <Switch>
          <Route
            path="/login"
            render={() => <Login _handleSetLogIn={_handleSetLogIn} />}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
