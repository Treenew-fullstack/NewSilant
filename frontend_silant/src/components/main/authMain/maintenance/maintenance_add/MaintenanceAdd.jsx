import React, { useEffect, useState } from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import './styles/addmainten.css';
import { useNavigate } from "react-router-dom";

const MaintenanceAdd = () => {
    const userFirstName = useSelector((state) => state.userData.user_first_name);
    const [typeMaintenance, setTypeMaintenance] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [machine, setMachine] = useState([]);
    const [formData, setFormData] = useState({
        car: '',
        type_maintenance: '',
        type_maintenance_name: '',
        type_maintenance_desc: '',
        service_company: '',
        service_company_name: '',
        service_company_desc: '',
        date: '',
        operating_time: '',
        work_order_number: '',
        work_order_date: '',
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
        } else {
            const selfServiceCompany = serviceCompany.find(item => item.name === "Самостоятельно")

            if (selfServiceCompany) {
                setFormData(prevState => ({
                    ...prevState,
                    service_company: selfServiceCompany.id,
                    service_company_name: selfServiceCompany.name,
                    service_company_desc: selfServiceCompany.description,
                }));
            }
        }
    }, [serviceCompany, userFirstName]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/typemaintenance/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                setTypeMaintenance(response.data);
            })
            .catch(error => {
                console.error('Ошибка получения типа ТО:', error.response ? error.response.data.message : error.message);
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

        if (name === "type_maintenance") {
            const selectedType = typeMaintenance.find(item => item.id.toString() === value.toString());
            if (selectedType) {
                setFormData(prevState => ({
                    ...prevState,
                    type_maintenance_name: selectedType.name,
                    type_maintenance_desc: selectedType.description,
                }));
            } else {
                console.log("Не найден выбранный тип ТО");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/maintenance/', formData, {
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
                <h1 className="text-add-h1">Добавить запись в таблицу ТО</h1>

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
                        <label>Вид ТО:</label>
                        <select name="type_maintenance" value={formData.type_maintenance} onChange={handleChange} required>
                            {typeMaintenance.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="label-container">
                        <label>Дата проведения ТО:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
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
                        <label>№ заказ-наряда:</label>
                        <input
                            type="text"
                            name="work_order_number"
                            value={formData.work_order_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="label-container">
                        <label>Дата заказ-наряда:</label>
                        <input
                            type="date"
                            name="work_order_date"
                            value={formData.work_order_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="button-add-ma">Добавить</button>
                </form>
            </main>

            <footer><Footer /></footer>
        </>
    );
};

export default MaintenanceAdd;