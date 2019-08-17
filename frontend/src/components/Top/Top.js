import React, { useState, useEffect } from 'react';
import {Form, Card, Select, Image, Icon} from 'semantic-ui-react';
import axios from 'axios';

export default function Top() {
const [isLoad, setLoad] = useState(false);
const [topArray, setTopArray] = useState([]);
useEffect(() => {
   axios('http://localhost:5000/api/rating')
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
        isLoad &&  <Card.Group style={{
            margin: '20px 20px 20px 157px',
        }} itemsPerRow={5}>
                {rating}
          </Card.Group>
    );
}
