import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { Container } from 'react-bootstrap';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  // Handler function for Log Out
  const _handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:8000/token/logout', {
        method: 'Post',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 204) {
        alert('You have been logged out from Coffeeholic! See you next time!');
        // delete the token
        localStorage.removeItem('token');
        // reset loggedIn state
        setLoggedIn(false);
      } else {
        alert('Something went wrong... Please try it again!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handler function for local storage
  const _handleSetLogIn = (authToken) => {
    setLoggedIn(true);
    localStorage.setItem('token', authToken);
  };

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} _handleLogOut={_handleLogOut} />
      Hello World
      <Container>
        <Switch>
          <Route
            path="/login"
            render={() => <Login _handleSetLogIn={_handleSetLogIn} />}
          />
          <Route path="/signup" render={() => <Signup />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
