import React, { useEffect, useState } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MaintenanceCh = () => {
    const { id } = useParams();
    const [maintenance, setMaintenance] = useState([]);
    const [formData, setFormData] = useState({
        car: '',
        date: '',
        operating_time: '',
        work_order_number: '',
        work_order_date: '',
        service_company: '',
        type_maintenance: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/maintenance/${id}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setMaintenance(response.data);
            console.log(`Данные ТО: ${id}, успешно загружены.`);
        })
        .catch(error => {
            if (error.response) {
                console.error(`Ошибка при получение данных: ${id}`, error.response.data);
            } else {
                console.error('Ошибка:', error.message);
            }
        });
    }, [id]);

    useEffect(() => {
        if (maintenance && maintenance.car) {
            setFormData({
                car: maintenance.car,
                date: maintenance.date,
                operating_time: maintenance.operating_time,
                work_order_number: maintenance.work_order_number,
                work_order_date: maintenance.work_order_date,
                service_company: maintenance.service_company,
                type_maintenance: maintenance.type_maintenance,
            });
        }
    }, [maintenance]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
        axios.put(`http://127.0.0.1:8000/api/maintenance/${id}/`, formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(`Данные у ТО ${id} успешно обновлены:`, response.data);
            navigate(-1);
        })
        .catch(error => {
            if (error.response) {
                console.error(`Ошибка при обновлении у ТО ${id} данных:`, error.response.data);
            } else {
                console.error('Ошибка:', error.message);
            }
        })
    };

    return (
        <>
            <header><Header /></header>

            <main>
                <h1 className="text-add-h1">Изменить данные у машины с зав. №: {maintenance.car_no}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="label-container">
                        <label>Дата проведения ТО: {maintenance.date}</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>Наработка, м/час: {maintenance.operating_time}</label>
                        <input
                            type="number"
                            name="operating_time"
                            value={formData.operating_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>№ заказ-наряда: {maintenance.work_order_number}</label>
                        <input
                            type="text"
                            name="work_order_number"
                            value={formData.work_order_number}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>Дата заказ-наряда: {maintenance.work_order_date}</label>
                        <input
                            type="date"
                            name="work_order_date"
                            value={formData.work_order_date}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="button-add-ma">Изменить</button>
                </form>
            </main>

            <footer><Footer /></footer>
        </>
    );
};

export default MaintenanceCh;