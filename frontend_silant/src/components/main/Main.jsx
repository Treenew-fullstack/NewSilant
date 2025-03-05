import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import './styles/main.css'
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import AuthMain from './authMain/AuthMain';

const Main = () => {
    const [machine, setMachine] = useState([]);
    const [machineNo, setMachineNo] = useState('');
    const [machineError, setMachineError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleCar = async (event) => {
        event.preventDefault();

        const isValid = validateMachineNo(machineNo);
        if (!isValid) {
            setErrorMessage('Введите номер машины!');
            setMachineError(true);
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/machines/?machine_no=${machineNo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (Array.isArray(response.data)) {
                setMachine(response.data);
                setLoading(true);
                setMachineError(false);
            } else {
                console.error('Ожидался массив, а получили:', response.data);
                setMachine([]);
            }

            if (response.data.length <= 0) {
                setLoading(false);
                setErrorMessage('Машина с таким заводским номером не найдена!');
                setMachineError(true);
            }
        } catch (error) {
            console.error('Ошибка отправки значения:', error.response ? error.response.data.message : error.message);
            setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
            setMachineError(true);
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    };

    const validateMachineNo = (input) => {
        const isValid = input.trim() !== '';
        setMachineError(!isValid);
        return isValid;
    };

    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                {isLoggedIn ? (
                    <AuthMain />
                ) : (
                    <>
                        <h1 className="text-non-auth-h1">Проверьте комплектацию и технические характеристики техники Силант</h1>

                        <form onSubmit={handleCar}>
                            <div className="input-button-container">
                                <input
                                    type="text"
                                    value={machineNo}
                                    onChange={(e) => setMachineNo(e.target.value)}
                                    placeholder="Заводской номер"
                                    className="input-car"
                                />

                                <button className="button-car" type="submit" disabled={!machine}>Поиск</button>
                            </div>
                            {machineError && <h1 className="text-non-auth-h1" style={{ color: '#D20A11' }}>{errorMessage}</h1>}
                        </form>

                        {loading ? (
                            <h1 className="text-non-auth-h1">Загружаем данные...</h1>
                        ) : (
                            <>
                                {Array.isArray(machine) && machine.length > 0 && (
                                    <>
                                        <h1 className="text-non-auth-h1">Результат поиска:</h1>
                                        <h1 className="text-non-auth-h1">Информация о комплектации и технических характеристиках Вашей техники</h1>

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
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {machine.map(item => (
                                                        <tr key={item.id}>
                                                            <td>{item.tech_model_name}</td>
                                                            <td>{item.machine_no}</td>
                                                            <td>{item.engine_name}</td>
                                                            <td>{item.engine_no}</td>
                                                            <td>{item.transmission_name}</td>
                                                            <td>{item.transmission_no}</td>
                                                            <td>{item.leading_axle_name}</td>
                                                            <td>{item.leading_axle_no}</td>
                                                            <td>{item.controlled_axle_name}</td>
                                                            <td>{item.controlled_axle_no}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </>
                    )}
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Main;