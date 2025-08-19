import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SeatMap from '../components/seatMap';
import ReservationList from '../components/reservationList';
import { format } from 'date-fns';

const InternDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await API.get('/reservations/my');
      setReservations(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load reservations' });
    }
  };

  const handleReserve = async () => {
    if (!selectedSeat) {
      setMessage({ type: 'error', text: 'Please select a seat' });
      return;
    }

    try {
      await API.post('/reservations', {
        seatId: selectedSeat._id,
        date: selectedDate
      });
      
      setMessage({ type: 'success', text: 'Reservation successful!' });
      setSelectedSeat(null);
      fetchReservations();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || 'Reservation failed'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Office Seat Reservation</h1>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Book a Seat</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={e => setSelectedDate(new Date(e.target.value))}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <SeatMap 
          date={selectedDate} 
          onSelect={setSelectedSeat} 
          selectedSeat={selectedSeat}
        />

        {selectedSeat && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold">Selected Seat: {selectedSeat.seatNumber}</h3>
            <p className="text-gray-600">Location: {selectedSeat.location}</p>
            <button
              onClick={handleReserve}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirm Reservation
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Reservations</h2>
        <ReservationList 
          reservations={reservations} 
          onCancel={fetchReservations} 
        />
      </div>
    </div>
  );
};

export default InternDashboard;