import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Skeleton from './components/Skeleton/Skeleton';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={'/sign_in'} component={Login}/>
                    <Route path={'/sign_up'} component={Registration}/>
                    <Route path={'/'} component={Skeleton}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
