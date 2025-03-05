import React, { useState, useCallback, useEffect } from "react";

import 'components/main/styles/main.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Maintenance = () => {
    const [maintenance, setMaintenance] = useState([]);
    const [filters, setFilters] = useState({
        typeMaintenanceName: '',
        carNo: '',
        serviceCompanyName: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchMaintenance = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/maintenance/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            if (Array.isArray(response.data)) {
                setMaintenance(response.data);
                setLoading(true);
            } else {
                console.error('Ожидался массив, а получили:', response.data);
                setMaintenance([]);
            }
        } catch (error) {
            console.error('Ошибка получения ТО:', error.response ? error.response.data.message : error.message);
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        fetchMaintenance();
    }, [fetchMaintenance]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value, });
    };

    const filteredMaintenance = maintenance.filter(item => {
        return (
            (filters.typeMaintenanceName === '' || item.type_maintenance_name.includes(filters.typeMaintenanceName)) &&
            (filters.carNo === '' || item.car_no.includes(filters.carNo)) &&
            (filters.serviceCompanyName === '' || item.service_company_name.includes(filters.serviceCompanyName))
        );
    })

    return (
        <div>
            {loading ? (
                <h1 className="text-non-auth-h1">Загружаем данные...</h1>
            ) : (
                <>
                <button className="button-add-to" onClick={() => navigate('/maintenance-add')}>Добавить запись</button>

                <div className="filters">
                    <input type="text" name="typeMaintenanceName" placeholder="Вид ТО" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="carNo" placeholder="Зав. № маишны" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="serviceCompanyName" placeholder="Организация, проводившая ТО" onChange={handleFilterChange} className="input-filters" />
                </div>

                {Array.isArray(filteredMaintenance) && filteredMaintenance.length > 0 && (
                    <div className="table-container">
                        <table className="custom-table">
                            <thead className="custom-thead">
                                <tr>
                                    <th>Зав. № маишны</th>
                                    <th>Вид ТО</th>
                                    <th>Дата проведения ТО</th>
                                    <th>Наработка, м/час</th>
                                    <th>№ заказ-наряда</th>
                                    <th>Дата заказ-наряда</th>
                                    <th>Организация, проводившая ТО</th>
                                    <th>Редактировать</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredMaintenance.map(item => (
                                    <tr key={item.id}>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.car_no}</Link></td>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.type_maintenance_name}</Link></td>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.date}</Link></td>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.operating_time}</Link></td>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.work_order_number}</Link></td>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.work_order_date}</Link></td>
                                        <td><Link to={`/maintenance-directory/${item.id}`}>{item.service_company_name}</Link></td>
                                        <td><Link to={`/maintenance-change/${item.id}`}>Редактировать</Link></td>
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

export default Maintenance;