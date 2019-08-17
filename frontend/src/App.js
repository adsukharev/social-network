import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Skeleton from './components/Skeleton/Skeleton';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
    return (
        <div className="App">
            <Router>
                <Switch>
                  <Route path="/login" render={() => (!isLoggedIn ? <Login setLogedIn={setLoggedIn} /> : <Redirect to="/" />)} />
                  <Route path="/registration" render={() => (!isLoggedIn ? <Registration setLogedIn={setLoggedIn} /> : <Redirect to="/" />)} />
                  <Route path="/" render={() => (isLoggedIn ? <Skeleton /> : <Redirect to="/login" />)} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
