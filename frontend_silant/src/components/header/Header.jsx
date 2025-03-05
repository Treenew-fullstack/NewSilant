import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "components/authorization/slice/authSlice";

import './styles/header.css';
import Logo from './logo/logo_red.png';
import Tg from './icon/tg.png';
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/v1/logout/', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            dispatch(logout());
            localStorage.removeItem('accessToken');
            navigate('/');
        } catch (error) {
            console.error('Ошибка при выходе:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <>
            <div className="header-back">
                <div className="header-main-container">
                    <h3 className="header-silant">СИЛАНТ</h3>
                    <img src={Logo} alt="Logo" className="header-logo" />
                    <h3 className="header-num">8 800 700-52-65</h3>
                    <img src={Tg} alt="Tg" className="header-tg-icon" />
                    {isLoggedIn ? (
                        <button className="header-button" onClick={handleLogout}>Выйти</button>
                    ) : (
                        <button className="header-button" onClick={() => navigate('/auth')}>Авторизация</button>
                    )}
                </div>
                <h1 className="text-h1">Электронная сервисная книжка "New Силант"</h1>
            </div>
        </>
    );
};

export default Header;
