import React, { useContext, useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom';
import pHaulAPI from '../api/pHaulAPI';
import Calendar from '../components/Calendar';
import { Context as MainContext } from '../context/mainContext';
export default function TruckShow() {
    const [error, setError] = useState(null);
    const [truck, setTruck] = useState({
        model: '',
        make: '',
        year: null,
        reservations: []
    })
    const {setNewReservation} = useContext(MainContext)
    const { push } = useHistory()
    const {id} = useParams()
    
    useEffect(() => {    
        (async () => {
            try {
                const {data} = await pHaulAPI.get(`/trucks/${id}`);
                setTruck(data)
            } catch(e) {
                console.log(e);
            }
        })()
    }, [])
    
    async function handleBooking(data) {
        const bookingData = {
            ...data,
            truck_id: id,
            user_id: 1
        }
        try {
            const response = await pHaulAPI.post('/reservations', bookingData)
            setNewReservation(response.data)
            push('/reservations')
        } catch(e) {
            setError('Booking could not be created, please try a different time or come back later')
        }
    }

    return (
        <div id="truck-show-container">
        <span className="error">{error}</span>
            <div className="truck-details show-container">
                <h1>{truck.year} {truck.make} {truck.model}</h1>
                <h2>Hourly Rate ${truck.hourly_rate}</h2>
                <img src={truck.image} alt={truck.model} />
            </div>
            <Calendar handleBooking={handleBooking} reservations={truck.reservations} cost={truck.hourly_rate}/>
        </div>
    )
}
