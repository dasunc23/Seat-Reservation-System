import React, { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const triggerReload = () => {
    setReloadTrigger(prev => prev + 1);
  };

  return (
    <ReservationContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedSeat,
        setSelectedSeat,
        reservations,
        setReservations,
        reloadTrigger,
        triggerReload
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);