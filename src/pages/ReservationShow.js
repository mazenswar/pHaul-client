import React, { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import pHaulAPI from '../api/pHaulAPI';
import { Context as MainContext } from '../context/mainContext';

export default function ReservationShow() {
    const {updateUserReservations} = useContext(MainContext);
    const {id} = useParams();
    const {push} = useHistory()
    const [reservation, setReservation] = useState({});
    useEffect(()=> {
        (async() =>{ 
            const {data} = await pHaulAPI.get(`/reservations/${id}`)
            setReservation(data);
        })()
    }, [])

    async function handleDelete() {
        await pHaulAPI.delete(`/reservations/${reservation.id}`);
        updateUserReservations(id)
        push('/')
    }
    
    return !reservation.truck ? null : (
        <div className="reservation-show">
            <img src={reservation.truck.image} alt={reservation.truck.name}/>
            <div className="reservation-details">
                <h3>Your reservation of the {reservation.truck.year} {reservation.truck.make} {reservation.truck.model} is confirmed for {new Date(reservation.start_time).toLocaleString()}</h3>
                <h4>Yout total amount comes to ${reservation.total_price}</h4>
                <button onClick={handleDelete}>Cancel Reservation</button>
            </div>
        </div>
    )
}
