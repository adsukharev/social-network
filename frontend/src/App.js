import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Skeleton from './components/Skeleton/Skeleton';
import Auth from './components/Auth/Auth';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={'/auth'} component={Auth}/>
                    <Route path={'/'} component={Skeleton}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
