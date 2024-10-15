import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import Layout from '../layout/Layout';

// Lazy load components
const Login = React.lazy(() => import('../pages/Login'));
const Home = React.lazy(() => import('../pages/Home'));
const CreatePatient = React.lazy(() => import('../pages/CreatePatient'));
const CreationConfirmation = React.lazy(() => import('../pages/CreationConfirmation'));
const CreationSuccess = React.lazy(() => import('../pages/CreationSuccess'));
const EditPatient = React.lazy(() => import('../pages/EditPatient'));
const EditConfirmation = React.lazy(() => import('../pages/EditConfirmation'));
const EditSuccess = React.lazy(() => import('../pages/EditSuccess'));
const SessionExpired = React.lazy(() => import('../pages/SessionExpired'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR', 'VIEWER']}>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/createpatient" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <CreatePatient />
              </PrivateRoute>
            } />
            <Route path="/confirm-create" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <CreationConfirmation />
              </PrivateRoute>
            } />
            <Route path="/success-create" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <CreationSuccess />
              </PrivateRoute>
            } />
            <Route path="/editpatient/:id" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <EditPatient />
              </PrivateRoute>
            } />
            <Route path="/confirm-edit/:id" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <EditConfirmation />
              </PrivateRoute>
            } />
            <Route path="/success-edit" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <EditSuccess />
              </PrivateRoute>
            } />
            <Route path="/unauthorized" element={
              <PrivateRoute roles={['ADMIN', 'EDITOR']}>
                <Unauthorized />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
