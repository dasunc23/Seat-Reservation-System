import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from '../pages/adminDashboard';

const AdminLayout = () => {
  return (
    <AdminDashboard>
      <Outlet />
    </AdminDashboard>
  );
};

export default AdminLayout;