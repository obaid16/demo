'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [activeReservation, setActiveReservation] = useState(null);
  const [reservationHistory, setReservationHistory] = useState([]);

  useEffect(() => {
    try {
      const savedActive = localStorage.getItem('noor_active_booking');
      if (savedActive) setActiveReservation(JSON.parse(savedActive));

      const savedHistory = localStorage.getItem('noor_booking_history');
      if (savedHistory) setReservationHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveReservation = (bookingData) => {
    const reservationId = 'NOOR-' + Math.floor(100000 + Math.random() * 900000);
    const fullBooking = {
      ...bookingData,
      id: reservationId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setActiveReservation(fullBooking);
    setReservationHistory((prev) => [fullBooking, ...prev]);

    try {
      localStorage.setItem('noor_active_booking', JSON.stringify(fullBooking));
      localStorage.setItem('noor_booking_history', JSON.stringify([fullBooking, ...reservationHistory]));
    } catch (e) {
      console.error(e);
    }

    return fullBooking;
  };

  return (
    <ReservationContext.Provider
      value={{
        activeReservation,
        reservationHistory,
        saveReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}
