import React, { useContext } from 'react'
import ReservationCard from '../components/ReservationCard'
import { Context as MainContext } from '../context/mainContext'

export default function Reservations() {
    const {state: {user}} = useContext(MainContext)
    function renderReservations() {
        return !user.reservations.length ? <h1>You don't have any upcoming reservations</h1> : user.reservations.map(res => <ReservationCard key={res.id} reservation={res}/>)
    }
    return (
        <div className="reservations-container">
            {renderReservations()}
        </div>
    )
}
