import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';
import PrivateRoute from './users/PrivateRoute';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddPatient from './users/AddPatient';
import EditUser from './users/EditUser';
import PatientCreationConfirmation from './pages/PatientCreationConfirmation';
import CreationSuccess from './pages/CreationSuccess';
import PatientAdjustmentConfirmation from './pages/PatientAdjustmentConfirmation';
import AdjustmentSuccess from './pages/AdjustmentSuccess';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/createpatient" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
          <Route path="/editpatient/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
          <Route path="/confirm-create" element={<PrivateRoute><PatientCreationConfirmation /></PrivateRoute>} />
          <Route path="/success-create" element={<PrivateRoute><CreationSuccess /></PrivateRoute>} />
          <Route path="/confirm-edit/:id" element={<PrivateRoute><PatientAdjustmentConfirmation /></PrivateRoute>} />
          <Route path="/success-edit" element={<PrivateRoute><AdjustmentSuccess /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
