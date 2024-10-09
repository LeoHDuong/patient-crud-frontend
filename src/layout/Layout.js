// src/layout/Layout.js
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the route's component */}
    </>
  );
}

export default Layout;
