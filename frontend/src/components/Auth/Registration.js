import React, { useState, useEffect } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import sendRegistrationData from './RegistrationListener';

export default function Registration(props) {
    const [firstName, setFirstName] = useState('');
    // const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRegistrationData();
    };
    const goHome = () => {
        props.setLogedIn(true);
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
            <h1 className="TitleAuth">Регистрация</h1>
            <input
                placeholder="Имя Фамилия"
                id="nameform"
                className="AuthInput"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); }}
            />
            {/* <input placeholder={'Фамилия'} */}
            {/**/}
            {/*       className={'AuthInput'} */}
            {/*       value={secondName} */}
            {/*       onChange={(e) => {setSecondName(e.target.value)}}/> */}
            <input
                placeholder="E-mail"
                id="emailform"
                className="AuthInput"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
            />
            <div className="TwoInputsInOneLine">
                <input
                    placeholder="Пароль"
                    id="passwordform"
                    className="AuthInput TwoInput"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                />
                <input
                    placeholder="Повторите пароль"
                    id="passwordform2"
                    className="AuthInput TwoInput"
                    value={password2}
                    onChange={(e) => { setPassword2(e.target.value); }}
                />
            </div>
            <button type="button" onClick={handleSubmit} className="AuthButton">Зарегистрироваться</button>
            <p>
                Уже есть аккаунт?
                <Link to="/login">Войти</Link>
            </p>
        </form>
    );
}
