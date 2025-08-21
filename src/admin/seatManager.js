import React, { useState, useEffect } from 'react';
import API from '../services/api';

const SeatManager = () => {
  const [seats, setSeats] = useState([]);
  const [newSeat, setNewSeat] = useState({ seatNumber: '', location: '' });
  const [editingSeat, setEditingSeat] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/seats');
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSeat = async () => {
    try {
      await API.post('/admin/seats', newSeat);
      setNewSeat({ seatNumber: '', location: '' });
      fetchSeats();
    } catch (error) {
      console.error('Error creating seat:', error);
    }
  };

  const handleUpdateSeat = async (id, updates) => {
    try {
      await API.put(`/admin/seats/${id}`, updates);
      fetchSeats();
      setEditingSeat(null);
    } catch (error) {
      console.error('Error updating seat:', error);
    }
  };

  const handleDeleteSeat = async (id) => {
    if (window.confirm('Are you sure you want to delete this seat?')) {
      try {
        await API.delete(`/admin/seats/${id}`);
        fetchSeats();
      } catch (error) {
        console.error('Error deleting seat:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Seats</h2>
      
      {/* Create Seat Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-3">Add New Seat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seat Number</label>
            <input
              type="text"
              value={newSeat.seatNumber}
              onChange={(e) => setNewSeat({...newSeat, seatNumber: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., A-101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={newSeat.location}
              onChange={(e) => setNewSeat({...newSeat, location: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., North Wing"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreateSeat}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Seat
            </button>
          </div>
        </div>
      </div>

      {/* Seats Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  Loading seats...
                </td>
              </tr>
            ) : seats.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No seats found
                </td>
              </tr>
            ) : (
              seats.map(seat => (
                <tr key={seat._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingSeat === seat._id ? (
                      <input
                        type="text"
                        defaultValue={seat.seatNumber}
                        onBlur={(e) => handleUpdateSeat(seat._id, { seatNumber: e.target.value })}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      seat.seatNumber
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingSeat === seat._id ? (
                      <input
                        type="text"
                        defaultValue={seat.location}
                        onBlur={(e) => handleUpdateSeat(seat._id, { location: e.target.value })}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      seat.location
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingSeat === seat._id ? (
                      <select
                        defaultValue={seat.status}
                        onBlur={(e) => handleUpdateSeat(seat._id, { status: e.target.value })}
                        className="p-1 border border-gray-300 rounded"
                      >
                        <option value="available">available</option>
                        <option value="unavailable">unavailable</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seat.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {seat.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {editingSeat === seat._id ? (
                      <button
                        onClick={() => setEditingSeat(null)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingSeat(seat._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSeat(seat._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatManager;