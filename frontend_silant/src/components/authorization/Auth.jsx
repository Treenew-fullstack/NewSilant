import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, checkAuth } from './slice/authSlice';

import './styles/auth.css'
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import silantSvg from './img/silant.svg';
import pdImg from './img/PD.png';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
        dispatch(checkAuth());
    }, [isLoggedIn, navigate, dispatch]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login/', {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = response.data;
            if (data.key) {
                localStorage.setItem('accessToken', data.key);
                dispatch(login({ accessToken: data.key}));
                navigate('/');
            } else {
                console.error('Токен не получен из ответа.');
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error.response ? error.response.data.message : error.message);
            setUsernameError(true);
            setPasswordError(true);
        }
    };

    const validateUsername = (input) => {
        if (!input) {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
    };

    const validatePassword = (input) => {
        if (!input) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleUsernameChange = (e) => {
        const input = e.target.value;
        setUsername(input);
        validateUsername(input);
    };

    const handlePasswordChange = (e) => {
        const input = e.target.value;
        setPassword(input);
        validatePassword(input);
    };

    return (
        <div>
            <header>
                <Header />
            </header>

            <main>
                <img src={silantSvg} alt="Silant" className="silant-svg" />

                <div className="auth-main-container">
                    <div className="auth-form-container">
                        <form onSubmit={handleLogin}>
                            <div className="label-input-container">
                                <label htmlFor="username">Логин:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>
                            {usernameError && <span className="span-auth">Введите корректные данные</span>}

                            <div className="label-input-container">
                                <label htmlFor="password">Пароль:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            {passwordError && <span className="span-auth">Введите правильный пароль</span>}

                            <button type="submit" disabled={!username || !password}>Войти</button>
                        </form>
                    </div>

                    <img src={pdImg} alt="PD" className="pd-img-auth" />
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Auth;