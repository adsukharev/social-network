import React, { useState, useEffect, useContext } from 'react';
import {Form, Card, Select, Image, Icon} from 'semantic-ui-react';
import axios from 'axios';
import api from "../../api";
import {UserContext} from "../../contexts/UserContext";

export default function Top() {
  const {userInfo, isLoaded} = useContext(UserContext);
const [isLoad, setLoad] = useState(false);
const [topArray, setTopArray] = useState([]);
useEffect(() => {
   api().get('http://localhost:5000/api/rating')
     .then((data) => {
         setTopArray(data.data);
         setLoad(true);
         console.log(data)
     })
}, []);

const rating = topArray.map((user) => {
      return (
<Card key={user.user_id}>
    <Image src={user.avatar}
    />
    <Card.Content>
        <Card.Header>
            {user.login}
        </Card.Header>
        <Card.Meta>
            {user.user_name}
        </Card.Meta>
        <Card.Description>
            {user.sumlikes}
        </Card.Description>
    </Card.Content>
</Card>
      );
  }
);
    return (
      isLoaded && userInfo && <Card.Group style={{
            margin: '20px 20px 20px 157px',
        }} itemsPerRow={5}>
                {rating}
          </Card.Group>
    );
}
