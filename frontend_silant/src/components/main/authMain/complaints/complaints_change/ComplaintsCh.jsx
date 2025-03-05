import React, { useEffect, useState } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ComplaintsCh = () => {
    const { id } = useParams();
    const [complaints, setComplaints] = useState([]);
    const [formData, setFormData] = useState({
        car: '',
        date_refusal: '',
        operating_time: '',
        failure_node: '',
        failure_desc: '',
        recovery_method: '',
        spare_parts: '',
        date_restoration: '',
        car_downtime: '',
        service_company: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/complaints/${id}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setComplaints(response.data);
            console.log(`Данные Рекламации ${id} успешно загружены.`);
        })
        .catch(error => {
            if (error.response) {
                console.error(`Ошибка при получение данных: ${id}`, error.response.data);
            } else {
                console.error('Ошибка:', error.message);
            }
        })
    }, [id]);

    useEffect(() => {
        if (complaints && complaints.car) {
            setFormData({
                car: complaints.car,
                date_refusal: complaints.date_refusal,
                operating_time: complaints.operating_time,
                failure_node: complaints.failure_node,
                failure_desc: complaints.failure_desc,
                recovery_method: complaints.recovery_method,
                spare_parts: complaints.spare_parts,
                date_restoration: complaints.date_restoration,
                car_downtime: complaints.car_downtime,
                service_company: complaints.service_company,
            });
        }
    }, [complaints]);

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
        axios.put(`http://127.0.0.1:8000/api/complaints/${id}/`, formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(`Данные у Рекламации ${id} успешно обновлены:`, response.data);
            navigate(-1);
        })
        .catch(error => {
            if (error.response) {
                console.error(`Ошибка при обновлении у Рекламации ${id} данных:`, error.response.data);
            } else {
                console.error('Ошибка:', error.message);
            }
        })
    };

    return (
        <>
            <header><Header /></header>

            <main>
                <h1 className="text-add-h1">Изменить данные у машины с зав. №: {complaints.car_no}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="label-container">
                        <label>Дата отказа: {complaints.date_refusal}</label>
                        <input
                            type="date"
                            name="date_refusal"
                            value={formData.date_refusal}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>Наработка, м/час: {complaints.operating_time}</label>
                        <input
                            type="number"
                            name="operating_time"
                            value={formData.operating_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>Описание отказа:</label>
                        <input
                            type="text"
                            name="failure_desc"
                            value={formData.failure_desc}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>Используемые запасные части:</label>
                        <input
                            type="text"
                            name="spare_parts"
                            value={formData.spare_parts}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-container">
                        <label>Дата восстановления: {complaints.date_restoration}</label>
                        <input
                            type="date"
                            name="date_restoration"
                            value={formData.date_restoration}
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

export default ComplaintsCh;