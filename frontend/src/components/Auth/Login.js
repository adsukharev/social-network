
import React, { useState, useEffect } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import sendLoginData from './LoginListener';
import LinkButton from '../LinkButton';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goHome = () => {
        props.setLogedIn(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendLoginData();
        setTimeout(() => {
            props.setLogedIn(true);
        }, 1000);
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
        <form className="DivForAuthForm">
            <h1 className="TitleAuth">Login</h1>
            <input placeholder="E-mail" id="emailform" value={email} className="AuthInput" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Пароль" id="passwordform" value={password} className="AuthInput" onChange={e => setPassword(e.target.value)} />
            <LinkButton to="/feed" onClick={handleSubmit} classVal="AuthButton">Войти</LinkButton>
            <p>
                Нет аккаунта?
                <Link to="/registration">Зарегистрироваться</Link>
            </p>
        </form>
    );
}
