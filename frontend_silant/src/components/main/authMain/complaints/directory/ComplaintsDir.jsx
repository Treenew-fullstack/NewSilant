import React, { useEffect, useState, useCallback } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/directory.css'
import dtIco from './img/dt.png';
import naIco from './img/na.png';
import coIco from './img/co.png';
import seIco from './img/se.png';

const ComplaintsDir = () => {
    const { id } = useParams();
    const [complaints, setComplaints] = useState([]);

    const fetchComplaints = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/complaints/${id}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            setComplaints(response.data);
        } catch (error) {
            console.error('Ошибка получения ТО:', error.response ? error.response.data.message : error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    return (
        <>
            <header><Header /></header>

            <main>
                <h1 key={complaints.id} className="text-main">Зав. № машины: <span className="span-cl">{complaints.car_no}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={dtIco} alt="Дата" className="icon-img" />
                        <h1 className="text-main">Дата отказа: <span className="span-cl">{complaints.date_refusal}</span></h1>
                    </div>
                </div>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={naIco} alt="Наработка" className="icon-img" />
                        <h1 className="text-main">Наработка, м/час: <span className="span-cl">{complaints.operating_time}</span></h1>
                    </div>
                </div>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={coIco} alt="Узел отказа" className="icon-img" />
                        <h1 className="text-main">Узел отказа: <span className="span-cl">{complaints.failure_node_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание узла отказа:</h1>
                <h3 className="text-desc">{complaints.failure_node_desc}</h3>

                <h1 className="text-main">Описание отказа:</h1>
                <h3 className="text-desc">{complaints.failure_desc}</h3>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={coIco} alt="Способ восстановления" className="icon-img" />
                        <h1 className="text-main">Способ восстановления: <span className="span-cl">{complaints.recovery_method_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание способа восстановления:</h1>
                <h3 className="text-desc">{complaints.recovery_method_desc}</h3>

                <h1 className="text-main">Используемые запасные части:</h1>
                <h3 className="text-desc">{complaints.spare_parts}</h3>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={dtIco} alt="Дата" className="icon-img" />
                        <h1 className="text-main">Дата восстановления: <span className="span-cl">{complaints.date_restoration}</span></h1>
                    </div>
                </div>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={dtIco} alt="Дата" className="icon-img" />
                        <h1 className="text-main">Время простоя техники: <span className="span-cl">{complaints.car_downtime} дней/дня/день</span></h1>
                    </div>
                </div>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={seIco} alt="Компания" className="icon-img" />
                        <h1 className="text-main">Организация, проводившая ТО: <span className="span-cl">{complaints.service_company_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание организации, проводившая ТО:</h1>
                <h3 className="text-desc">{complaints.service_company_desc}</h3>
            </main>

            <footer><Footer /></footer>
        </>
    );
};

export default ComplaintsDir;