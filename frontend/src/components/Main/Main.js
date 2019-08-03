import React, {Fragment} from 'react';
import { Switch, Route  } from 'react-router-dom'
import UserPage from '../UserPage/UserPage';
import Chat from '../Chat/Chat';
import Match from '../Match/Match';
import Notifications from '../Notifications/Notifications';
import Top from '../Top/Top';
import Recommendations from "../Recommendations/Recommendations";


export default function Main() {
    return(
        <Fragment>
            <Switch>
                <Route path={'/top'} render={Top}/>
                <Route path={'/notifications'} component={Notifications}/>
                <Route path={'/match'} component={Match}/>
                <Route path={'/recommendations'} component={Recommendations}/>
                <Route path={'/chats'} component={Chat}/>
                <Route path={'/user/:id'} component={UserPage} />
            </Switch>
        </Fragment>
    )
}