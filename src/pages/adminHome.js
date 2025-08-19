import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AdminHome = () => {
  const [stats, setStats] = useState({ totalSeats: 0, availableSeats: 0, activeReservationsToday: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch seats for quick counts
        const seatsRes = await API.get('/admin/seats');
        const totalSeats = seatsRes.data.length || 0;
        const availableSeats = seatsRes.data.filter(s => s.status === 'available').length || 0;

        // Fetch today's reservations via admin endpoint filtered by today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateParam = `${yyyy}-${mm}-${dd}`;
        const reservationsRes = await API.get('/admin/reservations', { params: { date: dateParam } });
        const activeReservationsToday = reservationsRes.data.filter(r => r.status === 'active').length || 0;

        setStats({ totalSeats, availableSeats, activeReservationsToday });
      } catch (e) {
        // Swallow errors in overview; detailed pages handle errors
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Total Seats</div>
          <div className="mt-2 text-3xl font-semibold">{loading ? '—' : stats.totalSeats}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Available Seats</div>
          <div className="mt-2 text-3xl font-semibold">{loading ? '—' : stats.availableSeats}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Active Reservations Today</div>
          <div className="mt-2 text-3xl font-semibold">{loading ? '—' : stats.activeReservationsToday}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/reservations" className="bg-indigo-600 text-white rounded-lg p-6 flex items-center justify-between hover:bg-indigo-700">
          <div>
            <div className="text-lg font-semibold">Manage Reservations</div>
            <div className="text-indigo-100 text-sm">View, filter, and cancel reservations</div>
          </div>
          <span className="text-2xl">📅</span>
        </a>
        <a href="/admin/seats" className="bg-indigo-600 text-white rounded-lg p-6 flex items-center justify-between hover:bg-indigo-700">
          <div>
            <div className="text-lg font-semibold">Manage Seats</div>
            <div className="text-indigo-100 text-sm">Create, edit, or remove seats</div>
          </div>
          <span className="text-2xl">💺</span>
        </a>
        <a href="/admin/reports" className="bg-indigo-600 text-white rounded-lg p-6 flex items-center justify-between hover:bg-indigo-700">
          <div>
            <div className="text-lg font-semibold">Reports</div>
            <div className="text-indigo-100 text-sm">Generate utilization reports</div>
          </div>
          <span className="text-2xl">📈</span>
        </a>
      </div>
    </div>
  );
};

export default AdminHome;


