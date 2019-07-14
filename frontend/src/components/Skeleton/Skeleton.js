import React, { useState } from 'react';
import MenuBar from "../MenuBar/MenuBar";
import Main from "../Main/Main"
import {BrowserRouter as Router} from "react-router-dom";

export default function Skeleton() {
    const [activeItem, setActiveItem] = useState('Моя страница');
    const handleItemClick = (e, {name}) => setActiveItem(name);
    return (
        <Router>
            <MenuBar setActiveItem={setActiveItem} activeItem={activeItem} handleItemClick={handleItemClick}/>
            <Main activeItem={activeItem}/>
        </Router>
    )
}