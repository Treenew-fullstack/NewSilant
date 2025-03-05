import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import 'components/main/styles/main.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Complaints = () => {
    const userFirstName = useSelector((state) => state.userData.user_first_name);
    const userIsStaff = useSelector((state) => state.userData.user_is_staff);
    const [complaints, setComplaints] = useState([]);
    const [filters, setFilters] = useState({
        failureNodeName: '',
        recoveryMethodName: '',
        serviceCompanyName: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const fetchComplaints = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/complaints/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            if (Array.isArray(response.data)) {
                setComplaints(response.data);
                setLoading(true);
            } else {
                console.error('Ожидался массив, а получили:', response.data);
                setComplaints([]);
            }
        } catch (error) {
            console.error('Ошибка получения Рекламаций:', error.response ? error.response.data.message : error.message);
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value, });
    };

    const filteredComplaints = complaints.filter(item => {
        return (
            (filters.failureNodeName === '' || item.failure_node_name.includes(filters.failureNodeName)) &&
            (filters.recoveryMethodName === '' || item.recovery_method_name.includes(filters.recoveryMethodName)) &&
            (filters.serviceCompanyName === '' || item.service_company_name.includes(filters.serviceCompanyName))
        );
    })

    const showButtonAdd = () => {
        const companyName = complaints.find(item => item.service_company_name === userFirstName);
        if (companyName || userIsStaff) {
            return (<button className="button-add-to" onClick={() => navigate('/complaints-add')}>Добавить запись</button>);
        }
        return null;
    };

    return (
        <div>
            {loading ? (
                <h1 className="text-non-auth-h1">Загружаем данные...</h1>
            ) : (
                <>
                {showButtonAdd()}

                <div className="filters">
                    <input type="text" name="failureNodeName" placeholder="Узел отказа" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="recoveryMethodName" placeholder="Способ восстановления" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="serviceCompanyName" placeholder="Сервисная компания" onChange={handleFilterChange} className="input-filters" />
                </div>

                {Array.isArray(filteredComplaints) && filteredComplaints.length > 0 && (
                    <div className="table-container">
                        <table className="custom-table">
                            <thead className="custom-thead">
                                <tr>
                                    <th>Зав. № маишны</th>
                                    <th>Дата отказа</th>
                                    <th>Наработка, м/час</th>
                                    <th>Узел отказа</th>
                                    <th>Описание отказа</th>
                                    <th>Способ восстановления</th>
                                    <th>Используемые запасные части</th>
                                    <th>Дата восстановления</th>
                                    <th>Время простоя техники</th>
                                    {complaints.find(item => item.service_company_name === userFirstName || userIsStaff) && (
                                        <th>Редактировать</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredComplaints.map(item => (
                                    <tr key={item.id}>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.car_no}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.date_refusal}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.operating_time}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.failure_node_name}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.failure_desc}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.recovery_method_name}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.spare_parts}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.date_restoration}</Link></td>
                                        <td><Link to={`/complaints-directory/${item.id}`}>{item.car_downtime}</Link></td>
                                        {complaints.find(item => item.service_company_name === userFirstName || userIsStaff) && (
                                            <td><Link to={`/complaints-change/${item.id}`}>Редактировать</Link></td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default Complaints;