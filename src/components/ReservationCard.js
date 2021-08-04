import React from 'react'
import { Link } from 'react-router-dom';
import pHaulAPI from '../api/pHaulAPI';
export default function ReservationCard({reservation}) {
    return (
        <Link to={`/reservations/${reservation.id}`} className="reservation-card">
            <h3>Reservation #{reservation.id}</h3>
            <h3>Pickup date:</h3>
            <h3>{new Date(reservation.start_time).toLocaleString()}</h3>
        </Link>
    )
}
