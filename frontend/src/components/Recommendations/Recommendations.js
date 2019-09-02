import React, { useState, useEffect} from 'react'
import {Form, Card, Select, Image, Icon} from 'semantic-ui-react'
import api from "../../api";
import {Link} from "react-router-dom";

const sortOptions = [
    {key: 'tags', text: 'tags', value: 'tags'},
    {key: 'age', text: 'age', value: 'age'},
    {key: 'rating', text: 'rating', value: 'rating'},
    {key: 'city', text: 'city', value: 'city'},
]

// const src = 'http://img.dailymail.co.uk/i/pix/2007/07_03/nasa1R3107_1000x1000.jpg';

export default function Recommendations() {
    const [recommendResult, setRecommendResult] = useState([]);
    const [resultGet, setResultGet] = useState(false);
    useEffect(() => {
        api().get('search', {  headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }})
          .then((data) => {
              setRecommendResult(data.data);
              setResultGet(true);
              if(data.data.length === 0) {
                 setResultGet(false);
              }
          })
          .catch(e => {
              console.log(e);
          })
    }, []);
    let recommendResultMaped = [];
    if(recommendResult.length > 0){
        recommendResultMaped = recommendResult.map((user) => {
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
        });
    };
    return (
        <div className="match-container">
            <h1>Рекоммендации</h1>
            {resultGet ?  <div className="rating-container">
                <Card.Group style={{ margin: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} itemsPerRow={7}>
                    {recommendResultMaped}
                </Card.Group>
            </div> : <h1>Список рекоммендация для вас пуст!</h1>}
        </div>
    );
}
