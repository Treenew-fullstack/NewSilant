import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import { useNavigate } from "react-router-dom";

const ComplaintsAdd = () => {
    const userFirstName = useSelector((state) => state.userData.user_first_name);
    const [failureNode, setFailureNode] = useState([]);
    const [recoveryMethod, setRecoveryMethod] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [machine, setMachine] = useState([]);
    const [formData, setFormData] = useState({
        car: '',
        failure_node: '',
        failure_node_name: '',
        failure_node_desc: '',
        recovery_method: '',
        recovery_method_name: '',
        recovery_method_desc: '',
        service_company: '',
        service_company_name: '',
        service_company_desc: '',
        date_refusal: '',
        operating_time: '',
        failure_desc: '',
        spare_parts: '',
        date_restoration: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const matchedCompany = serviceCompany.find(item => item.name === userFirstName);

        if (matchedCompany) {
            setFormData(prevState => ({
                ...prevState,
                service_company: matchedCompany.id,
                service_company_name: matchedCompany.name,
                service_company_desc: matchedCompany.description,
            }));
            console.log(matchedCompany.name);
        }
    }, [serviceCompany, userFirstName]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/failurenode/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setFailureNode(response.data);
        })
        .catch(error => {
            console.error('Ошибка получения типа Узла отказа:', error.response ? error.response.data.message : error.message);
        });

        axios.get('http://127.0.0.1:8000/api/recoverymethod/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setRecoveryMethod(response.data);
        })
        .catch(error => {
            console.error('Ошибка получения типа Способа восстановления:', error.response ? error.response.data.message : error.message);
        });

        axios.get('http://127.0.0.1:8000/api/machines/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                setMachine(response.data);
            })
            .catch(error => {
                console.error('Ошибка получения машин:', error.response ? error.response.data.message : error.message);
            });

        axios.get('http://127.0.0.1:8000/api/servicecompany/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setServiceCompany(response.data);
        })
        .catch(error => {
            console.error('Ошибка получения компаний:', error.response ? error.response.data.message : error.message);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === "failure_node") {
            const selectedType = failureNode.find(item => item.id.toString() === value.toString());
            if (selectedType) {
                setFormData(prevState => ({
                    ...prevState,
                    failure_node_name: selectedType.name,
                    failure_node_desc: selectedType.description,
                }));
            } else {
                console.log("Не найден выбранный тип Узла отказа");
            }
        }

        if (name === "recovery_method") {
            const selectedType = recoveryMethod.find(item => item.id.toString() === value.toString());
            if (selectedType) {
                setFormData(prevState => ({
                    ...prevState,
                    recovery_method_name: selectedType.name,
                    recovery_method_desc: selectedType.description,
                }));
            } else {
                console.log("Не найден способ восставнолвения");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/complaints/', formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Данные успешно отправлены:', response.data);
            navigate(-1);
        })
        .catch(error => {
            if (error.response) {
                console.error('Ошибка при отправке данных:', error.response.data);
            } else {
                console.error('Ошибка:', error.message);
            }
        });
    };

    return (
        <>
            <header><Header /></header>

            <main>
                <h1 className="text-add-h1">Добавить запись в таблицу Рекламаций</h1>

                <form onSubmit={handleSubmit}>
                    <div className="label-container">
                        <label>Зав. № маишны:</label>
                        <select name="car" value={formData.car} onChange={handleChange}>
                            {machine.map((item) => (
                                <option key={item.id} value={item.id}>{item.machine_no}</option>
                            ))}
                        </select>
                    </div>

                    <div className="label-container">
                        <label>Дата отказа:</label>
                        <input
                            type="date"
                            name="date_refusal"
                            value={formData.date_refusal}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="label-container">
                        <label>Наработка, м/час:</label>
                        <input
                            type="number"
                            name="operating_time"
                            value={formData.operating_time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="label-container">
                        <label>Узел отказа:</label>
                        <select name="failure_node" value={formData.failure_node} onChange={handleChange} required>
                            {failureNode.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="label-container">
                        <label>Описание отказа:</label>
                        <input
                            type="text"
                            name="failure_desc"
                            value={formData.failure_desc}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="label-container">
                        <label>Способ восстанолвения:</label>
                        <select name="recovery_method" value={formData.recovery_method} onChange={handleChange} required>
                            {recoveryMethod.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="label-container">
                        <label>Используемые запасные части:</label>
                        <input
                            type="text"
                            name="spare_parts"
                            value={formData.spare_parts}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="label-container">
                        <label>Дата восстановления:</label>
                        <input
                            type="date"
                            name="date_restoration"
                            value={formData.date_restoration}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="button-add-ma">Добавить</button>
                </form>
            </main>

            <footer><Footer/></footer>
        </>
    );
};

export default ComplaintsAdd;