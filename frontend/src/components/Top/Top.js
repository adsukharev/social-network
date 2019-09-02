import React, { useState, useEffect, useContext } from 'react';
import {Form, Card, Select, Image, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import api from "../../api";
import {UserContext} from "../../contexts/UserContext";

export default function Top() {

  const {userInfo, isLoaded} = useContext(UserContext);
  const [isLoad, setLoad] = useState(false);
  const [topArray, setTopArray] = useState([]);
  useEffect(() => {
    api().get('http://localhost:5000/api/rating', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((data) => {
        setTopArray(data.data);
        setLoad(true);
      })
  }, [isLoaded]);

  const rating = topArray.map((user) => {
      return (
        <Card key={user.user_id}>
          <Link to={`/users/${user.user_id}`}>
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
          </Link>
        </Card>
      );
    }
  );
  return (
    isLoaded && userInfo && isLoad && <div className="rating-container">
      <h1>Лучшие пользователи</h1>
      <Card.Group style={{
        margin: 'auto', width: '100%', backgroundColor: 'pink'
      }} itemsPerRow={7}>
        {rating}
      </Card.Group>
    </div>
  );
}
