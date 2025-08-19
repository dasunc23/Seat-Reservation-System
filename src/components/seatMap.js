import React, { useState, useEffect } from 'react';
import API from '../services/api';

const SeatMap = ({ date, onSelect, selectedSeat }) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeats = async () => {
      if (!date) return;
      
      try {
        setLoading(true);
        const res = await API.get(`/seats/availability?date=${date.toISOString()}`);
        setSeats(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load seat data');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [date]);

  if (loading) return <div className="text-center py-8">Loading seats...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-3">Available Seats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {seats.map(seat => (
          <button
            key={seat._id}
            className={`p-4 rounded-lg transition-all ${
              seat._id === selectedSeat?._id
                ? 'ring-4 ring-blue-500 bg-blue-100'
                : seat.status === 'available'
                  ? 'bg-green-100 hover:bg-green-200'
                  : 'bg-gray-100 cursor-not-allowed'
            }`}
            disabled={seat.status !== 'available'}
            onClick={() => onSelect(seat)}
          >
            <div className="font-bold">{seat.seatNumber}</div>
            <div className="text-sm text-gray-600 mt-1">{seat.location}</div>
            <div className={`text-xs mt-1 ${
              seat.status === 'available' ? 'text-green-600' : 'text-gray-500'
            }`}>
              {seat.status.toUpperCase()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;