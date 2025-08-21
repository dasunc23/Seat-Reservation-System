import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { format } from 'date-fns';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, [filterDate]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const params = filterDate ? { date: filterDate } : {};
      const response = await API.get('/admin/reservations', { params });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        // Use admin cancel endpoint to bypass intern-only restrictions
        await API.patch(`/admin/reservations/${id}/cancel`);
        fetchReservations();
      } catch (error) {
        console.error('Error cancelling reservation:', error);
      }
    }
  };

  const [assignForm, setAssignForm] = useState({ internEmail: '', seatId: '', date: '' });
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    const loadSeats = async () => {
      try {
        const res = await API.get('/admin/seats');
        setAvailableSeats(res.data);
      } catch (e) {
        console.error('Failed to load seats', e);
      }
    };
    loadSeats();
  }, []);

  const handleAssign = async () => {
    if (!assignForm.internEmail || !assignForm.seatId || !assignForm.date) {
      alert('Please fill all fields');
      return;
    }
    try {
      await API.post('/admin/reservations/assign', assignForm);
      setAssignForm({ internEmail: '', seatId: '', date: '' });
      fetchReservations();
    } catch (e) {
      alert(e?.response?.data?.error || 'Failed to assign');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reservation Management</h2>
        <div className="flex space-x-2">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => setFilterDate('')}
            className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Manual Assignment */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-3">Manually Assign Seat</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="email"
            placeholder="Intern email"
            value={assignForm.internEmail}
            onChange={(e) => setAssignForm({ ...assignForm, internEmail: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            value={assignForm.seatId}
            onChange={(e) => setAssignForm({ ...assignForm, seatId: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select seat</option>
            {availableSeats.map((s) => (
              <option key={s._id} value={s._id}>{s.seatNumber} - {s.location}</option>
            ))}
          </select>
          <input
            type="date"
            value={assignForm.date}
            onChange={(e) => setAssignForm({ ...assignForm, date: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button onClick={handleAssign} className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Assign</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading reservations...</div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No reservations found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map(reservation => (
                <tr key={reservation._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(reservation.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{reservation.intern.name}</div>
                    <div className="text-sm text-gray-500">{reservation.intern.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.seat.seatNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.seat.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reservation.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.status === 'active' && (
                      <button
                        onClick={() => handleCancelReservation(reservation._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;