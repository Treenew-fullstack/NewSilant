import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import 'components/main/styles/main.css'
import axios from "axios";

const CarsInfo = () => {
    const [machine, setMachine] = useState([]);
    const [filters, setFilters] = useState({
        techModel: '',
        engineName: '',
        transmissionName: '',
        controlledAxleName: '',
        leadingAxleName: '',
        machineNo: '',
    });
    const [loading, setLoading] = useState(false)

    const fetchCarsInfo = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/machines/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            if (Array.isArray(response.data)) {
                setMachine(response.data);
                setLoading(true);
            } else {
                console.error('Ожидался массив, а получили:', response.data);
                setMachine([]);
            }
        } catch (error) {
            console.error('Ошибка получения машин:', error.response ? error.response.data.message : error.message);
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        fetchCarsInfo();
    }, [fetchCarsInfo]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value, });
    };

    const filteredMachines = machine.filter(item => {
        return (
            (filters.techModel === '' || item.tech_model_name.includes(filters.techModel)) &&
            (filters.engineName === '' || item.engine_name.includes(filters.engineName)) &&
            (filters.transmissionName === '' || item.transmission_name.includes(filters.transmissionName)) &&
            (filters.controlledAxleName === '' || item.controlled_axle_name.includes(filters.controlledAxleName)) &&
            (filters.leadingAxleName === '' || item.leading_axle_name.includes(filters.leadingAxleName)) &&
            (filters.machineNo === '' || item.machine_no.includes(filters.machineNo))
        );
    })

    return (
        <div>
            {loading ? (
                <h1 className="text-non-auth-h1">Загружаем данные...</h1>
            ) : (
                <>
                <div className="filters">
                    <input type="text" name="techModel" placeholder="Модель техники" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="engineName" placeholder="Модель двигателя" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="transmissionName" placeholder="Модель трансмиссии" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="controlledAxleName" placeholder="Модель управляемого моста" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="leadingAxleName" placeholder="Модель ведущего моста" onChange={handleFilterChange} className="input-filters" />
                    <input type="text" name="machineNo" placeholder="Зав. № маишны" onChange={handleFilterChange} className="input-filters" />
                </div>

                {Array.isArray(filteredMachines) && filteredMachines.length > 0 && (
                    <div className="table-container">
                        <table className="custom-table">
                            <thead className="custom-thead">
                                <tr>
                                    <th>Модель техники</th>
                                    <th>Зав. № маишны</th>
                                    <th>Модель двигателя</th>
                                    <th>Зав. № двигателя</th>
                                    <th>Модель трансмиссии</th>
                                    <th>Зав. № трансмиссии</th>
                                    <th>Модель ведущего моста</th>
                                    <th>Зав. № ведущего моста</th>
                                    <th>Модель управляемого моста</th>
                                    <th>Зав. № управляемого моста</th>
                                    <th>Дата отгрузки с завода</th>
                                    <th>Покупатель</th>
                                    <th>Грузополучатель (конечный потребитель)</th>
                                    <th>Адрес поставки (эксплуатации)</th>
                                    <th>Комплектация (доп. опции)</th>
                                    <th>Сервисная компания</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredMachines.map(item => (
                                    <tr key={item.id}>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.tech_model_name}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.machine_no}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.engine_name}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.engine_no}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.transmission_name}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.transmission_no}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.leading_axle_name}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.leading_axle_no}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.controlled_axle_name}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.controlled_axle_no}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.shipment_date}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.client_name}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.consignee}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.delivery_address}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.eqiupment}</Link></td>
                                        <td><Link to={`/machine-directory/${item.id}`}>{item.service_company_name}</Link></td>
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

export default CarsInfo;