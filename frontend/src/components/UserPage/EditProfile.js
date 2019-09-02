import React, { useState, useEffect, useContext } from 'react';
import {Input, Select} from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import {UserContext} from "../../contexts/UserContext";
import api from "../../api";
import deleteIcon from "../../images/elliot.jpg";

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

const sexOptions = [
  {key: 'male', text: 'Мужской', value: 'male'},
  {key: 'female', text: 'Женский', value: 'female'},
];

const preferencesOptions = [
  {key: 'bisexual', text: 'Бисексуал', value: 'bisexual'},
  {key: 'homo', text: 'Гомосексуал', value: 'homo'},
  {key: 'getero', text: 'Гетеросексуал', value: 'getero'},
];

const notificationOptions = [
  {key: 'true', text: 'Да', value: true},
  {key: 'false', text: 'Нет', value: false},
];

// const tagsOptions = [
//   {key: 'cinema', text: 'Кино', value: 'Кино'},
//   {key: 'music', text: 'Музыка', value: 'Музыка'},
//   {key: 'sport', text: 'Спорт', value: 'Спорт'},
//   {key: 'computers', text: 'Компьютерс', value: 'Компьютерс'},
//   {key: 'talking', text: 'Общение', value: 'Общение'},
//   {key: 'travel', text: 'Путешествия', value: 'Путешествия'},
// ];

export default function EditProfile(props) {
  const { closeModalWindow } = props;
  const { userInfo, isLoaded, changed, setChanged } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState('male');
  const [preferences, setPreferences] = useState('');
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState([]);
  const [notification, setNotification] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [avatar, setAvatar] = useState('');
  const [tagsOptions, setTagsOptions] = useState([]);

  useEffect(() => {
    if (isLoaded) {
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
      api().get(props.location.pathname.substring(1), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((data) => {
          if (data.data.email !== null) {
            setEmail(data.data.email);
          }
          if (data.data.login !== null) {
            setLogin(data.data.login);
          }
          if (data.data.user_name !== null) {
            setUserName(data.data.user_name);
          }
          if (data.data.age !== null) {
            setAge(data.data.age);
          }
          if (data.data.sex !== null) {
            setSex(data.data.sex);
          }
          if (data.data.preferences !== null) {
            setPreferences(data.data.preferences);
          }
          if (data.data.bio !== null) {
            setBio(data.data.bio);
          }
          if (data.data.tags !== null) {
            setTags(data.data.tags);
          }
          if (data.data.notification !== null) {
            setNotification(data.data.notification);
          }
          setIsLoad(true);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const submit = async () => {
    const data =  new FormData();

    data.append('email', email);
    data.append('login', login);
    data.append('user_name', userName);
    data.append('age', age);
    data.append('sex', sex);
    data.append('preferences', preferences);
    data.append('bio', bio);
    data.append('notification', notification);
    data.append('password', password);
    data.append('avatar', avatar);
    data.append('tags', JSON.stringify(tags));
    await api().put(`users/${userInfo.user_id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }}).then(
      (data) => {
        setChanged(!changed);
        closeModalWindow();
      },
    ).catch(err => console.log(err));
  };
  return (
    isLoad && <div className="ModalWindowBackground" >
      <div className="ModalWindowWhiteDiv">
        <div className="DivTitleAndCloseInModalWindow">
          <p className="TextTitleInModalWindow">Изменить инфо</p>
          <button type="button" className="CloseButtonInModalWindow" onClick={closeModalWindow}>
            <img src={deleteIcon} alt="delete" className="ImgCloseButtonInModalWindow" />
          </button>
        </div>
        <form className="profile-form-edit" onSubmit={(e) => { handleSubmit(e); }}>
          <label htmlFor="email" className="LabelForDataAboutUser">
            email
            <Input id="email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="login" className="LabelForDataAboutUser">
            login
            <Input id="login" value={login} onChange={(e) => { setLogin(e.target.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="userName" className="LabelForDataAboutUser">
            userName
            <Input id="userName" value={userName} onChange={(e) => { setUserName(e.target.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="age" className="LabelForDataAboutUser">
            Возраст
            <Select id="age" defaultValue={age} options={ageOptions} onChange={(e, data) => {setAge(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="sex" className="LabelForDataAboutUser">
            Пол
            <Select id="sex" defaultValue={sex} options={sexOptions} onChange={(e, data) => { setSex(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="preferences" className="LabelForDataAboutUser">
            Предпочтения
            <Select id="preferences" options={preferencesOptions} defaultValue={preferences} onChange={(e, data) => { setPreferences(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="bio" className="LabelForDataAboutUser">
            О себе
            <Input id="bio" value={bio} onChange={(e) => { setBio(e.target.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="tags" className="LabelForDataAboutUser">
            Интересы
            <Select multiple id="tags" defaultValue={tags} options={tagsOptions} onChange={(e, data) => {
              setTags(data.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="notification" className="LabelForDataAboutUser">
            Присылать уведомления
            <Select id="notification" defaultValue={notification} options={notificationOptions} onChange={(e,data) => { setNotification(data.value) }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="password" className="LabelForDataAboutUser">
            Новый пароль
            <Input id="password" value={password} onChange={(e) => { setPassword(e.target.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="passwordCheck" className="LabelForDataAboutUser">
            Повторите пароль
            <Input id="passwordCheck" value={passwordCheck} onChange={(e) => { setPasswordCheck(e.target.value); }} className="InputForDataAboutUser" />
          </label>
          <label htmlFor="avatar" className="LabelForDataAboutUser">
            Аватар
            <Input  type="file" id="avatar" onChange={(e) => {
              setAvatar(e.target.files[0]); }} className="InputForDataAboutUser" />
          </label>
          <div className="DivWithTwoButtons">
            <button type="button" onClick={() => closeModalWindow()} className="EditProfile">Отменить</button>
            <button type="button" onClick={submit} className="WriteMesButton">Сохранить</button>
          </div>
        </form>
    </div>
      </div>
  );
}
