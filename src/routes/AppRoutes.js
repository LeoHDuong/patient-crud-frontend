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
import SessionExpired from '../pages/SessionExpired';
import Unauthorized from '../pages/Unauthorized';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/session-expired" element={<SessionExpired/>}/>
        <Route element={<Layout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute roles={['ADMIN', 'EDITOR', 'VIEWER']}><Home /></PrivateRoute>} />
          <Route path="/createpatient" element={<PrivateRoute roles={['ADMIN', 'EDITOR']}><AddPatient /></PrivateRoute>} />
          <Route path="/editpatient/:id" element={<PrivateRoute roles={['ADMIN', 'EDITOR']}><EditUser /></PrivateRoute>} />
          <Route path="/confirm-create" element={<PrivateRoute roles={['ADMIN', 'EDITOR']}><PatientCreationConfirmation /></PrivateRoute>} />
          <Route path="/success-create" element={<PrivateRoute roles={['ADMIN', 'EDITOR']}><CreationSuccess /></PrivateRoute>} />
          <Route path="/confirm-edit/:id" element={<PrivateRoute roles={['ADMIN', 'EDITOR']}><PatientAdjustmentConfirmation /></PrivateRoute>} />
          <Route path="/success-edit" element={<PrivateRoute roles={['ADMIN', 'EDITOR']}><AdjustmentSuccess /></PrivateRoute>} />
          <Route path="/unauthorized" element={<PrivateRoute><Unauthorized/></PrivateRoute>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
