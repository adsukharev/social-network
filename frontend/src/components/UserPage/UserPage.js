import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Card, Form, Header, Image, Input, Modal, Select, Statistic, Grid} from 'semantic-ui-react'

const genderOptions = [
  {key: 'm', text: 'Man', value: 'Man'},
  {key: 'w', text: 'Woman', value: 'Woman'},
];

const ageOptions = [
  {key: '16', text: '16', value: '16'},
  {key: '17', text: '17', value: '17'},
  {key: '18', text: '18', value: '18'},
  {key: '19', text: '19', value: '19'},
  {key: '20', text: '20', value: '20'},
  {key: '21', text: '21', value: '21'},
  {key: '22', text: '22', value: '22'},
  {key: '23', text: '23', value: '23'},
  {key: '24', text: '24', value: '24'},
  {key: '25', text: '25', value: '25'},
  {key: '26', text: '26', value: '26'},
  {key: '27', text: '27', value: '27'},
  {key: '28', text: '28', value: '28'},
  {key: '29', text: '29', value: '29'},
  {key: '30', text: '30', value: '30'},
];

const cityOptions = [
  {key: 'MSC', text: 'Moscow', value: 'MSC'},
  {key: 'SPB', text: 'Saint-Petersburg', value: 'SPB'},
  {key: 'NVSB', text: 'Novosibirsk', value: 'NVSB'},
];

const orientationOptions = [
  {key: 'Bisexual', text: 'Bisexual', value: 'Bisexual'},
  {key: 'Heterosexual', text: 'Heterosexual', value: 'Heterosexual'},
  {key: 'Homosexual', text: 'Homosexual', value: 'Homosexual'},
];

export default function ChangeProfileModal(props) {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      await axios('http://localhost:5000/api/users/1', {
      })
        .then(data => {
          console.log(data.data);
          setUser(data.data);
          setIsLoaded(true);
        });
        // .then(userData => {
        //
        //   console.log(userData);
        //
        // }
      // ).catch(e => {
      //   console.log(e);
      // })
    };
    getUserData();
  }, []);

  return (
    isLoaded &&
    <Fragment>
      <Modal trigger={<Button color='red'>Change</Button>}>
        <Modal.Header>Change Profile</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium'
                 src={ user.avatar[0] }/>
          <Modal.Description>
            <Header>Изменить профиль</Header>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='Login'
                  placeholder={user.login}
                />
              <Form.Group widths='equal'>
                <Form.Field
                  label='Email'
                  control={Input}
                  placeholder={user.email}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='First name'
                  placeholder={user.user_name}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Select}
                  options={genderOptions}
                  label={{children: 'Gender', htmlFor: 'form-select-control-gender'}}
                  search
                  searchInput={{id: 'form-select-control-gender'}}
                  placeholder='man or woman'
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Select}
                  options={ageOptions}
                  label={{children: 'Age', htmlFor: 'form-select-control-age'}}
                  search
                  searchInput={{id: 'form-select-control-age'}}
                  placeholder='Your age'
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Select}
                  options={orientationOptions}
                  label={{children: 'Orientation', htmlFor: 'form-select-control-orientation'}}
                  searchInput={{id: 'form-select-control-city'}}
                  placeholder={user.preferences}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field className="ui right labeled left icon input">
                  <i className="tags icon"/>
                  <input type="text" placeholder="Enter tags"/>
                  <a className="ui tag label">
                    Add Tag
                  </a>
                </Form.Field>
                <Form.Field
                  label='Bio'
                  control={Input}
                  placeholder={user.bio}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Checkbox inline label='Email notifications'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field/>
                <Form.Field
                  control={Button}
                  color='blue'
                  content='Change'
                />
              </Form.Group>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <br/><br/><br/><br/>
      <Grid divided='vertically'>
        <Grid.Row columns={6}>
          <Grid.Column/>
          <Card>
            <Image src={ user.avatar[0] } wrapped
                   ui={false}/>
            <Card.Content>
              <Card.Header>{ user.user_name }</Card.Header>
              <Card.Meta>
                <span className='date'>{ user.age }</span>
              </Card.Meta>
            </Card.Content>
          </Card>
          <Grid.Column>
            <p>Имя</p>
            <p>Login</p>
            <p>Email</p>
            <p>Пол</p>
            <p>Возраст</p>
            <p>Предпочтения</p>
            <p>О себе</p>
            <p>Город</p>
            <p>Теги</p>
            <p><b>Рейтинг</b></p>
          </Grid.Column>
          <Grid.Column>
            <p>{user.user_name}</p>
            <p>{ user.login }</p>
            <p>{ user.email }</p>
            <p>{ user.sex }</p>
            <p>{ user.city }</p>
            <p>{user.tags}</p>
            <p>{ user.bio } </p>
            {/*<p><b>{ user.rating.length }</b></p>*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br/><br/><br/><br/>
      <Form.Group widths='equal'>
        <Form.Field control={Button}>
          <Statistic size='tiny' color='green'>
            <Statistic.Label>Просмотры</Statistic.Label>
            {/*<Statistic.Value><b>{ user.history.length }</b></Statistic.Value>*/}
          </Statistic>
        </Form.Field>
        <Form.Field control={Button}>
          <Statistic size='tiny' color='red'>
            <Statistic.Label>Лайки</Statistic.Label>
            {/*<Statistic.Value><b>{ user.likes.likes }</b></Statistic.Value>*/}
          </Statistic>
        </Form.Field>
      </Form.Group>
    </Fragment>
  );
}
