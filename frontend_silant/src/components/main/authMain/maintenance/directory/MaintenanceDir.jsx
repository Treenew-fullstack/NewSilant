import React, { useEffect, useState, useCallback } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/directory.css'
import toIco from './img/to.png';
import dtIco from './img/dt.png';
import naIco from './img/na.png';
import seIco from './img/se.png';

const MaintenanceDir = () => {
    const { id } = useParams();
    const [maintenance, setMaintenance] = useState([]);

    const fetchMaintenance = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/maintenance/${id}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            setMaintenance(response.data);
        } catch (error) {
            console.error('Ошибка получения ТО:', error.response ? error.response.data.message : error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchMaintenance();
    }, [fetchMaintenance]);

    return (
        <>
            <header><Header /></header>

            <main>
                <h1 key={maintenance.id} className="text-main">Зав. № машины: <span className="span-cl">{maintenance.car_no}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={toIco} alt="ТО" className="icon-img" />
                        <h1 className="text-main">Вид ТО: <span className="span-cl">{maintenance.type_maintenance_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание ТО:</h1>
                <h3 className="text-desc">{maintenance.type_maintenance_desc}</h3>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={dtIco} alt="Дата" className="icon-img" />
                        <h1 className="text-main">Дата проведения ТО: <span className="span-cl">{maintenance.date}</span></h1>
                    </div>
                </div>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={naIco} alt="Наработка" className="icon-img" />
                        <h1 className="text-main">Наработка, м/час: <span className="span-cl">{maintenance.operating_time}</span></h1>
                    </div>
                </div>

                <h1 className="text-main">№ заказ-наряда: <span className="span-cl">{maintenance.work_order_number}</span></h1>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={dtIco} alt="Дата" className="icon-img" />
                        <h1 className="text-main">Дата заказ-наряда: <span className="span-cl">{maintenance.work_order_date}</span></h1>
                    </div>
                </div>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={seIco} alt="Компания" className="icon-img" />
                        <h1 className="text-main">Организация, проводившая ТО: <span className="span-cl">{maintenance.service_company_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание организации, проводившая ТО:</h1>
                <h3 className="text-desc">{maintenance.service_company_desc}</h3>
            </main>

            <footer><Footer /></footer>
        </>
    );
};

export default MaintenanceDir;