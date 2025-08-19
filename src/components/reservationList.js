import React from 'react';
import API from '../services/api';
import { format } from 'date-fns';

const ReservationList = ({ reservations, onCancel }) => {
  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    
    try {
      await API.patch(`/reservations/${id}/cancel`);
      onCancel();
    } catch (err) {
      alert('Failed to cancel reservation');
    }
  };

  const items = Array.isArray(reservations) ? reservations : [];

  if (items.length === 0) {
    return <p className="text-gray-500">No reservations found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map(reservation => (
            <tr key={reservation._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(reservation.date), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reservation.seat?.seatNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reservation.seat?.location}
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {reservation.status === 'active' && (
                  <button
                    onClick={() => handleCancel(reservation._id)}
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
  );
};

export default ReservationList;