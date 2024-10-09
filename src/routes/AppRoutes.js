// src/routes/Routes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AddPatient from '../pages/AddPatient';
import EditUser from '../pages/EditUser';
import PatientCreationConfirmation from '../pages/PatientCreationConfirmation';
import CreationSuccess from '../pages/CreationSuccess';
import PatientAdjustmentConfirmation from '../pages/PatientAdjustmentConfirmation';
import AdjustmentSuccess from '../pages/AdjustmentSuccess';
import PrivateRoute from '../routes/PrivateRoute';
import Layout from '../layout/Layout';

function AppRoutes() {
  return (
    <Router>
      <Routes>
      <Route element={<Layout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/createpatient" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
          <Route path="/editpatient/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
          <Route path="/confirm-create" element={<PrivateRoute><PatientCreationConfirmation /></PrivateRoute>} />
          <Route path="/success-create" element={<PrivateRoute><CreationSuccess /></PrivateRoute>} />
          <Route path="/confirm-edit/:id" element={<PrivateRoute><PatientAdjustmentConfirmation /></PrivateRoute>} />
          <Route path="/success-edit" element={<PrivateRoute><AdjustmentSuccess /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
