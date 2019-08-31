import React, {useState, useEffect, useContext} from 'react';
import {Grid, Form, Select, Input, Card, Image} from "semantic-ui-react";
import api from "../../api";
import {Link} from "react-router-dom";

const ageOptions = [
  { key: '18', text: '18', value: 18 },
  { key: '19', text: '19', value: 19 },
  { key: '20', text: '20', value: 20 },
  { key: '21', text: '21', value: 21 },
  { key: '22', text: '22', value: 22 },
  { key: '23', text: '23', value: 23 },
  { key: '24', text: '24', value: 24 },
  { key: '25', text: '25', value: 25 },
  { key: '26', text: '26', value: 26 },
  { key: '27', text: '27', value: 27 },
  { key: '28', text: '28', value: 28 },
  { key: '29', text: '29', value: 29 },
  { key: '30', text: '30', value: 30 },
  { key: '31', text: '31', value: 31 },
  { key: '32', text: '32', value: 32 },
  { key: '33', text: '33', value: 33 },
  { key: '35', text: '35', value: 35 },
  { key: '36', text: '36', value: 36 },
  { key: '37', text: '37', value: 37 },
  { key: '38', text: '38', value: 38 },
  { key: '39', text: '39', value: 39 },
  { key: '40', text: '40', value: 40 },
  { key: '41', text: '41', value: 41 },
  { key: '42', text: '42', value: 42 },
  { key: '43', text: '43', value: 43 },
  { key: '44', text: '44', value: 44 },
  { key: '45', text: '45', value: 45 },
];

const likesOptions = [
  { key: '0', text: '0', value: 0 },
  { key: '1', text: '1', value: 1 },
  { key: '2', text: '2', value: 2 },
  { key: '3', text: '3', value: 3 },
  { key: '4', text: '4', value: 4 },
  { key: '5', text: '5', value: 5 },
  { key: '6', text: '6', value: 6 },
  { key: '7', text: '7', value: 7 },
  { key: '8', text: '8', value: 8 },
  { key: '9', text: '9', value: 9 },
  { key: '10', text: '10', value: 10 },
  { key: '11', text: '11', value: 11 },
  { key: '12', text: '12', value: 12 },
  { key: '13', text: '13', value: 13 },
  { key: '14', text: '14', value: 14 },
  { key: '15', text: '15', value: 15 },
  { key: '16', text: '16', value: 16 },
  { key: '17', text: '17', value: 17 },
  { key: '18', text: '18', value: 18 },
  { key: '19', text: '19', value: 19 },
  { key: '20', text: '20', value: 20 },
  { key: '21', text: '21', value: 21 },
  { key: '22', text: '22', value: 22 },
  { key: '23', text: '23', value: 23 },
  { key: '24', text: '24', value: 24 },
  { key: '25', text: '25', value: 25 },
  { key: '26', text: '26', value: 26 },
  { key: '27', text: '27', value: 27 },
  { key: '28', text: '28', value: 28 },
  { key: '29', text: '29', value: 29 },
  { key: '30', text: '30', value: 30 },
];

const sexOptions = [
  {key: 'male', text: 'Мужской', value: 'male'},
  {key: 'female', text: 'Женский', value: 'female'},
];

const preferencesOptions = [
  {key: 'bisexual', text: 'Бисексуал', value: 'bisexual'},
  {key: 'homo', text: 'Гомосексуал', value: 'homo'},
  {key: 'getero', text: 'Гетеросексуал', value: 'getero'},
];

const locationOptions = [
  { key: 'yes', text: 'Да', value: 1 },
  { key: 'no', text: 'Нет', value: 0 },
];

export default function Match() {
  const [tagsOptions, setTagsOptions] = useState([]);
  const [startAge, setStartAge] = useState(0);
  const [finishAge, setFinishAge] = useState(0);
  const [startSumLikes, setStartSumLikes] = useState(0);
  const [finishSumLikes, setFinishSumLikes] = useState(0);
  const [sex, setSex] = useState('');
  const [preferences, setPreferences] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [resultGet, setResultGet] = useState(false);

    useEffect(() => {
      api().get('tags',
        {  headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },})
        .then(data => {
          let newOpt = data.data.map(item => {
            return ({
              key: item, text: item, value: item
            })
          });
          setTagsOptions(newOpt);
        })
        .catch(e => console.log(e));
    }, []);

    const submit = async () => {
      const data = JSON.stringify({
        age: [startAge, finishAge],
        sumLikes: [startSumLikes, finishSumLikes],
        sex,
        preferences,
        location,
        tags
      });
      api().post('search', data, {  headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }})
        .then((data) => {
          setSearchResult(data.data);
          setResultGet(true);
          if (data.data.length === 0) {
            alert('Поиск с такими параметрами не дал результатов!');
          }
        })
        .catch(e => {
          console.log(e);
        })

    };
    let searchResultMaped = [];
  if(searchResult.length > 0){
      searchResultMaped = searchResult.map((user) => {
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
            <h1>Search</h1>
          <form>
          <label htmlFor="startAge" className="LabelForDataAboutUser">
            Возраст от:
            <Select id="startAge" defaultValue={startAge} options={ageOptions} onChange={(e, data) => { setStartAge(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="finishAge" className="LabelForDataAboutUser">
            до:
            <Select id="finishAge" defaultValue={finishAge} options={ageOptions} onChange={(e, data) => { setFinishAge(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="startSumLikes" className="LabelForDataAboutUser">
            Количество лайков от:
            <Select id="startSumLikes" defaultValue={startSumLikes} options={likesOptions} onChange={(e, data) => { setStartSumLikes(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="finishSumLikes" className="LabelForDataAboutUser">
            до:
            <Select id="finishSumLikes" defaultValue={finishSumLikes} options={likesOptions} onChange={(e, data) => { setFinishSumLikes(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="tags" className="LabelForDataAboutUser">
            Интересы
            <Select multiple id="tags" defaultValue={tags} options={tagsOptions} onChange={(e, data) => {
              setTags(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="sex" className="LabelForDataAboutUser">
            Пол
            <Select id="sex" defaultValue={sex} options={sexOptions} onChange={(e, data) => { setSex(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="preferences" className="LabelForDataAboutUser">
            Предпочтения
            <Select id="preferences" options={preferencesOptions} defaultValue={preferences} onChange={(e, data) => { setPreferences(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="preferences" className="LabelForDataAboutUser">
            Искать поблизости:
            <Select id="preferences" options={locationOptions} defaultValue={location} onChange={(e, data) => { setLocation(data.value); }} className="InputForDataAboutUser" />
          </label>
            <button type="button" onClick={submit} className="WriteMesButton">Принять</button>
          </form>
          {resultGet ?  <div className="rating-container">
            <Card.Group style={{ margin: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} itemsPerRow={7}>
              {searchResultMaped}
            </Card.Group>
          </div> : null}
        </div>
    )
}

