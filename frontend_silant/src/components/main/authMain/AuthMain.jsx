import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import './styles/authmain.css'
import axios from "axios";
import CarsInfo from './cars_info/CarsInfo';
import Complaints from './complaints/Complaints';
import Maintenance from './maintenance/Maintenance';
import { setUserFirstName, setUserIsStaff } from "./user_data/userDataSlice";

const AuthMain = () => {
    const [userData, setUserData] = useState([]);
    const [activeComponent, setActiveComponent] = useState('cars_info');
    const dispatch = useDispatch();

    const fetchUserDetail = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/user/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                }
            });
            setUserData(response.data);
            dispatch(setUserFirstName(response.data.first_name));
            dispatch(setUserIsStaff(response.data.is_staff));
        } catch (error) {
            console.error('Ошибка получения данных:', error.response ? error.response.data.message : error.message);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUserDetail();
    }, [fetchUserDetail]);

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'cars_info':
                return <CarsInfo />
            case 'to':
                return <Maintenance />
            case 'complaints':
                return <Complaints />
            default:
                return <CarsInfo />
        }
    };

    return (
        <div>
            <div className='authmain-text-container'>
                <h1 key={userData.id} className='h1-text'>{userData.first_name}</h1>
                <h1 className='h1-text'>Информация о комплектации и технических характеристиках Вашей техники</h1>
            </div>

            <div className="authmain-button-container">
                <button onClick={() => handleButtonClick('cars_info')}>Общая информация</button>
                <button onClick={() => handleButtonClick('to')}>ТО</button>
                <button onClick={() => handleButtonClick('complaints')}>Рекламации</button>
            </div>

            {renderComponent()}
        </div>
    );
};

export default AuthMain;