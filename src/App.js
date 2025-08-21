import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/authContect';
import { ReservationProvider } from './context/reservvationContext';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgotPassword';
import ResetPasswordPage from './pages/resetPassword';
import DashboardPage from './pages/internDasboard';
import ProfilePage from './pages/profile';
import PrivateRoute from './components/privateRoute';

// Admin components
import AdminLayout from './components/adminLayout';
import SeatManager from './admin/seatManager';
import AdminReservations from './admin/adminReservation';
import ReportGenerator from './admin/reportGenerator';
import AdminHome from './pages/adminHome';

const AppContent = () => {
  const location = useLocation();
  const hideChrome = ['/login', '/register', '/forgot-password'].includes(location.pathname) || location.pathname.startsWith('/reset-password');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HomePage />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <>
                <Navbar />
                <DashboardPage />
              </>
            </PrivateRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <PrivateRoute adminOnly>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<AdminHome />} />
            <Route path="seats" element={<SeatManager />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="reports" element={<ReportGenerator />} />
          </Route>
          
          <Route path="/profile" element={
            <PrivateRoute>
              <>
                <Navbar />
                <ProfilePage />
              </>
            </PrivateRoute>
          } />
          
          <Route path="*" element={
            <>
              <Navbar />
              <HomePage />
            </>
          } />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <Router>
          <AppContent />
        </Router>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;