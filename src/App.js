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
  // UserInfo display
  const [userInfo, setUserInfo] = useState(null);

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
        // clearing user info display when logging out
        setUserInfo(null);
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
    getUserInfo();
  };

  // Function for userInfo display
  const getUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/me', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
    }
  }, []);

  return (
    <div className="App">
      <Navigation
        loggedIn={loggedIn}
        _handleLogOut={_handleLogOut}
        userInfo={userInfo}
      />
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
