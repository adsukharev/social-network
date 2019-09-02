import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Skeleton from './components/Skeleton/Skeleton';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import history from './history';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    let headers = {};
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    fetch('http://localhost:5000/api/secret', { headers })
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
          setIsLoaded(true);
        } else {
          setIsLoaded(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);


    return (
      isLoaded && <Router history={history}>
        <div className="App">

                <Switch>
                  <Route path="/login" render={() => (!isLoggedIn ? <Login setLogedIn={setLoggedIn} /> : <Redirect to="/" />)} />
                  <Route path="/registration" render={() => (!isLoggedIn ? <Registration setLogedIn={setLoggedIn} /> : <Redirect to="/" />)} />
                  <Route path="/" render={() => (isLoggedIn ? <Skeleton setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} /> : <Redirect to="/login" />)} />
                </Switch>
        </div>
        </Router>
    );
}

export default App;
