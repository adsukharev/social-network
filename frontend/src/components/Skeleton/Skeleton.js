import React, {Fragment, useState} from 'react';
import MenuBar from "../MenuBar/MenuBar";
import Main from "../Main/Main"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

export default function Skeleton() {
    const [activeItem, setActiveItem] = useState('Моя страница');

    const handleItemClick = (e, {name}) => setActiveItem(name);
    return (
        <Router>
          <Route path={'/'} render={ () => {
            return(
            <Fragment>
              <MenuBar  setActiveItem={setActiveItem} activeItem={activeItem} handleItemClick={handleItemClick}/>
              <Main  activeItem={activeItem}/>
            </Fragment>)
          }} />
        </Router>
    )
}
