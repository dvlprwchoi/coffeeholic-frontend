import './App.css';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} />
      Hello World
    </div>
  );
}

export default App;
