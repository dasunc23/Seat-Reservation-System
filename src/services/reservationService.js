import React, { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservations, setReservations] = useState([]);

  return (
    <ReservationContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedSeat,
        setSelectedSeat,
        reservations,
        setReservations
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);