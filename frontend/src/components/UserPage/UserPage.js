import React, {Fragment, useState, useEffect, useContext} from 'react';
import defaultImage from '../../images/image.png';
import {Button, Card, Form, Header, Image, Input, Modal, Select, Statistic, Grid} from 'semantic-ui-react'
import jwtDecode from 'jwt-decode';
import {UserContext} from "../../contexts/UserContext";


export default function ChangeProfileModal(props) {
  const { userInfo, isLoaded } = useContext(UserContext);
  const [myPage, setMyPage] = useState(false);
  useEffect(() => {
    if (isLoaded) {
      setMyPage(props.location.pathname.substring(6) == jwtDecode(localStorage.getItem('token')).identity);
    }
  }, [isLoaded]);
  return (
    isLoaded && <Fragment style={{margin: 'auto'}}>
      {myPage ? alert(myPage) : alert(myPage)}
    </Fragment>
  );
}
