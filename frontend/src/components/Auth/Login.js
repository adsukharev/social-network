
import React, { useState, useEffect } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton';
import api from "../../api";
import axios from 'axios';
import { usePosition } from 'use-position';

export default function Login(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [geoloc, setGeoloc] = useState({});
  const { latitude, longitude, error } = usePosition();

    const goHome = () => {
        props.setLogedIn(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(latitude, longitude);
        const data = {
            login: login,
            password: password,
            latitude,
          longitude
        };
        await api().post('signin', data, {
            headers: { Accept: 'application/json',
          'Content-Type': 'application/json',
            }}).then(data => {
            console.log(data);
            if (data.data.message === 'ok') {
                localStorage.setItem('token', data.data.access_token);
                props.setLogedIn(true);
            }
        });
    };

    useEffect(() => {
      console.log(geoloc);
    }, [geoloc]);
    useEffect(() => {
        const checkLogin = async () => {

            const token = localStorage.getItem('token');
            let headers = {};
            if (token) {
                headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
            await axios('http://localhost:5000/api/secret', {headers}).then((res) => {
                if (res.status === 200) {
                    goHome();
                }
            });
        };
        checkLogin();
    }, []);

    return (
        <form className="DivForAuthForm">
            <h1 className="TitleAuth">Login</h1>
            <input placeholder="Login" id="emailform" value={login} className="AuthInput" onChange={e => setLogin(e.target.value)} />
            <input placeholder="Пароль" type="password" id="passwordform" value={password} className="AuthInput" onChange={e => setPassword(e.target.value)} />
            <LinkButton to="/feed" onClick={handleSubmit} classVal="AuthButton">Войти</LinkButton>
            <p>
                Нет аккаунта?
                <Link to="/registration">Зарегистрироваться</Link>
            </p>
        </form>
    );
}
