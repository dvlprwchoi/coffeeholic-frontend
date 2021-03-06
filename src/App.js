import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import { Container } from 'react-bootstrap';
import './App.css';
import Coffeeshops from './components/Coffeeshops/Coffeeshops';
import CoffeeshopDetail from './components/CoffeeshopDetail/CoffeeshopDetail';
import CoffeeshopCreate from './components/CoffeeshopCreate/CoffeeshopCreate';
import About from './components/About/About';

const API_URL = 'https://boiling-beach-43710.herokuapp.com/';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  // UserInfo display
  const [userInfo, setUserInfo] = useState(null);

  // Handler function for Log Out
  const _handleLogOut = async () => {
    try {
      const response = await fetch(API_URL + 'token/logout', {
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
        // clearing user info display when logging outf
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
      const response = await fetch(API_URL + 'users/me', {
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
      <main>
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route
              path="/login"
              render={() => <Login _handleSetLogIn={_handleSetLogIn} />}
            />
            <Route path="/signup" render={() => <Signup />} />
            <Route
              path="/coffeeholic"
              exact
              render={() => <Coffeeshops loggedIn={loggedIn} />}
            />
            <Route
              path="/coffeeholic/:id"
              render={() => (
                <CoffeeshopDetail userInfo={userInfo} loggedIn={loggedIn} />
              )}
            />
            <Route
              path="/new"
              render={() => <CoffeeshopCreate loggedIn={loggedIn} />}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default App;
