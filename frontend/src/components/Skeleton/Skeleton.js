import React, {Fragment, useState} from 'react';
import MenuBar from "../MenuBar/MenuBar";
import Main from "../Main/Main"
import {BrowserRouter as Router, Route} from "react-router-dom";
import UserContextProvider from "../../contexts/UserContext";
import ChatContextProvider from '../../contexts/ChatContext';

export default function Skeleton(props) {
    const [activeItem, setActiveItem] = useState('Моя страница');

    const handleItemClick = (e, {name}) => setActiveItem(name);
    return (
        <Router>
          <UserContextProvider>
            <ChatContextProvider>
          <Route path={'/'} render={ () => {
            return(
            <Fragment>
              <MenuBar {...props} setActiveItem={setActiveItem} setLoggedIn={props.setLoggedIn} isLoggedIn={props.isLoggedIn} activeItem={activeItem} handleItemClick={handleItemClick}/>
              <Main  activeItem={activeItem}/>
            </Fragment>)
          }} />
            </ChatContextProvider>
          </UserContextProvider>
        </Router>
    )
}
