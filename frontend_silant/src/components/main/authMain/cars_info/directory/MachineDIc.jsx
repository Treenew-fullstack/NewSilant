import React, { useEffect, useState, useCallback } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/directory.css'
import pdIco from './img/PD.png';
import pgIco from './img/PG.png';
import peIco from './img/PE.png';
import trIco from './img/tr.png';
import zpIco from './img/zp.png';
import zaIco from './img/za.png';
import adIco from './img/ad.png';
import coIco from './img/co.png';
import seIco from './img/se.png';

const MachineDic = () => {
    const { id } = useParams();
    const [machine, setMachine] = useState([]);

    const fetchCarsInfo = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/machines/${id}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            setMachine(response.data);
        } catch (error) {
            console.error('Ошибка получения машины:', error.response ? error.response.data.message : error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchCarsInfo();
    }, [fetchCarsInfo]);

    return (
        <>
            <header><Header /></header>

            <main>
                <h1 key={machine.id} className="text-main">Зав. № машины: <span className="span-cl">{machine.machine_no}</span></h1>

                <h1 className="text-main">Модель техники: <span className="span-cl">{machine.tech_model_name}</span></h1>
                <h1 className="text-main">Описание техники:</h1>
                <h3 className="text-desc">{machine.tech_model_desc}</h3>

                <h1 className="text-main">Зав. № двигателя: <span className="span-cl">{machine.engine_no}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        {machine.tech_model_name && machine.tech_model_name.startsWith('ПД') && <img src={pdIco} alt="ПД" className="icon-img" />}
                        {machine.tech_model_name && machine.tech_model_name.startsWith('ПГ') && <img src={pgIco} alt="ПГ" className="icon-img" />}
                        {machine.tech_model_name && machine.tech_model_name.startsWith('ПЭ') && <img src={peIco} alt="ПЭ" className="icon-img" />}
                        <h1 className="text-main">Модель двигателя: <span className="span-cl">{machine.engine_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание двигателя:</h1>
                <h3 className="text-desc">{machine.engine_desc}</h3>

                <h1 className="text-main">Зав. № трансмиссии: <span className="span-cl">{machine.transmission_no}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={trIco} alt="Трансмиссия" className="icon-img" />
                        <h1 className="text-main">Модель трансмиссии: <span className="span-cl">{machine.transmission_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание трансмиссии:</h1>
                <h3 className="text-desc">{machine.transmission_desc}</h3>

                <h1 className="text-main">Зав. № ведущего моста: <span className="span-cl">{machine.leading_axle_no}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={zpIco} alt="Запчасти" className="icon-img" />
                        <h1 className="text-main">Модель ведущего моста: <span className="span-cl">{machine.leading_axle_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание ведущего моста:</h1>
                <h3 className="text-desc">{machine.leading_axle_desc}</h3>

                <h1 className="text-main">Зав. № управляемого моста: <span className="span-cl">{machine.controlled_axle_no}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={zpIco} alt="Запчасти" className="icon-img" />
                        <h1 className="text-main">Модель управляемого моста: <span className="span-cl">{machine.controlled_axle_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание управляемого моста:</h1>
                <h3 className="text-desc">{machine.controlled_axle_desc}</h3>

                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={zaIco} alt="Завод" className="icon-img" />
                        <h1 className="text-main">Дата отгрузки с завода: <span className="span-cl">{machine.shipment_date}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Покупатель: <span className="span-cl">{machine.client_name}</span></h1>
                <h1 className="text-main">Грузополучатель (конечный потребитель): <span className="span-cl">{machine.consignee}</span></h1>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={adIco} alt="Адрес" className="icon-img" />
                        <h1 className="text-main">Адрес поставки (эксплуатации): <span className="span-cl">{machine.delivery_address}</span></h1>
                    </div>
                </div>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={coIco} alt="Комплектация" className="icon-img" />
                        <h1 className="text-main">Комплектация (доп. опции):</h1>
                    </div>
                </div>
                <h3 className="text-desc">{machine.eqiupment}</h3>
                <div className="icon-text-main-container">
                    <div className="icon-text-container">
                        <img src={seIco} alt="Компания" className="icon-img" />
                        <h1 className="text-main">Сервисная компания: <span className="span-cl">{machine.service_company_name}</span></h1>
                    </div>
                </div>
                <h1 className="text-main">Описание сервисной компании:</h1>
                <h3 className="text-desc">{machine.service_company_desc}</h3>
            </main>

            <footer><Footer /></footer>
        </>
    );
};

export default MachineDic;