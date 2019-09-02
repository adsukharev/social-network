import React, {useEffect, useState, useContext} from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import UserPage from '../UserPage/UserPage';
import Chat from '../Chat/Chat';
import Match from '../Match/Match';
import Notifications from '../Notifications/Notifications';
import Top from '../Top/Top';
import Recommendations from "../Recommendations/Recommendations";
import UserPageLogin from "../UserPage/UserPageLogin";
import {Advertisement} from 'semantic-ui-react';
import {UserContext} from "../../contexts/UserContext";
import {ChatContext} from "../../contexts/ChatContext";
import { ToastProvider, useToasts } from "../toast-manager";

export default function Main() {
    const {socket} = useContext(ChatContext);
    const [notificationContent, setNotificationContent] = useState('');
    const { add } = useToasts();
    useEffect(() => {
        socket.on('notification', (notification) => {
            add(notification);
        });
    }, []);
    return(
        <div className="main-container">
            <Switch>
                <Route path={'/top'} component={Top}/>
                <Route path={'/notifications'} component={Notifications}/>
                <Route path={'/match'} component={Match}/>
                <Route path={'/Recommendations'} component={Recommendations}/>
                <Route path={'/chats'} component={Chat}/>
                <Route path={'/chats/:id'} component={Chat}/>
                <Route path={'/users/:id'} component={UserPage} />
                <Route path={'/user_login/:login'} component={UserPageLogin}/>
            </Switch>
        </div>
    )
}
