import {Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './components/main/Main';
import Auth from './components/authorization/Auth';
import { useDispatch } from 'react-redux';
import { login } from './components/authorization/slice/authSlice';
import { useEffect } from 'react';
import MachineDic from './components/main/authMain/cars_info/directory/MachineDIc';
import MaintenanceDir from './components/main/authMain/maintenance/directory/MaintenanceDir';
import ComplaintsDir from './components/main/authMain/complaints/directory/ComplaintsDir';
import MaintenanceAdd from './components/main/authMain/maintenance/maintenance_add/MaintenanceAdd';
import ComplaintsAdd from './components/main/authMain/complaints/complaints_add/ComplaintsAdd';
import MaintenanceCh from './components/main/authMain/maintenance/maintenance_change/MaintenanceCh';
import ComplaintsCh from './components/main/authMain/complaints/complaints_change/ComplaintsCh';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(login({accessToken: token}));
    }
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path='/complaints-change/:id' element={<ComplaintsCh />} />
        <Route path='/maintenance-change/:id' element={<MaintenanceCh />} />
        <Route path='/complaints-add' element={<ComplaintsAdd />} />
        <Route path='/maintenance-add' element={<MaintenanceAdd />} />
        <Route path='/complaints-directory/:id' element={<ComplaintsDir />} />
        <Route path='/maintenance-directory/:id' element={<MaintenanceDir />} />
        <Route path='/machine-directory/:id' element={<MachineDic />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
