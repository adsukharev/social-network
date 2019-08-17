import React, { useState, useEffect } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import serializeJSON from '../serializeJSON';
import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Registration(props) {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { setLogedIn } = props;

  const goHome = () => {
    setLogedIn(true);
  };


  const sendRegistrationData = async () => {
    if (email !== '' && password !== '' && password2 !== '' && name !== '' && login) {
      if (password2 !== password) {
        alert('Пароли не совпадают!');
      } else {
        await fetch('http://localhost:5000/api/signup', {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          email: email.toLowerCase(),
          password,
          user_name: name,
          login
        }),
        })
          .then(res => res.json())
          .then(async (data) => {
            console.log(data);
            // if (!data.token) {
            //   alert(data.err);
            // } else {
            //   await localStorage.setItem('token', data.token);
            //   goHome();
            // }
          })
          .catch((e) => {
            alert(e);
          });
      }
    } else {
      alert('Не все поля заполнены!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRegistrationData();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    let headers = {};
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    fetch('http://localhost:3020/resource/secret', { headers }).then((res) => {
      if (res.status === 200) {
        goHome();
      }
    });
  }, []);
  return (
    <form onSubmit={handleSubmit} className="DivForAuthForm">
      <h1 className="TitleAuth">Регистрация</h1>
      <input
        required
        placeholder="Имя Фамилия"
        className="AuthInput"
        value={name}
        onChange={(e) => { setName(e.target.value); }}
      />
      <input
        required
        placeholder="Login"
        className="AuthInput"
        value={login}
        onChange={(e) => { setLogin(e.target.value); }}
      />
      <input
        required
        type="email"
        placeholder="E-mail"
        className="AuthInput"
        value={email}
        onChange={(e) => { setEmail(e.target.value); }}
      />
      <div className="TwoInputsInOneLine">
        <input
          required
          placeholder="Пароль"
          className="AuthInput TwoInput"
          value={password}
          type="password"
          onChange={(e) => { setPassword(e.target.value); }}
        />
        <input
          required
          placeholder="Повторите пароль"
          className="AuthInput TwoInput"
          type="password"
          value={password2}
          onChange={(e) => { setPassword2(e.target.value); }}
        />
      </div>
      <button type="submit" className="AuthButton">Зарегистрироваться</button>
      <p>
        Уже есть аккаунт?
        <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}
