import React, { useContext, useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom';
import pHaulAPI from '../api/pHaulAPI';
import Calendar from '../components/Calendar';
import { Context as MainContext } from '../context/mainContext';
export default function TruckShow() {
    const { push } = useHistory()
    const {setNewReservation} = useContext(MainContext)
    const {id} = useParams()
    const [truck, setTruck] = useState({
        model: '',
        make: '',
        year: null,
        reservations: []
    })
    
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
        // TEST CLASH
        // let startTime = new Date('Aug 14, 2021')
        // startTime.setHours(13)
        // startTime.setMinutes(0)
        // let endTime = new Date('Aug 14, 2021')
        // endTime.setHours(16)
        // endTime.setMinutes(0)
        // const bookingData2 = {
        //     start_time: startTime,
        //     end_time: endTime,
        //     user_id: 1,
        //     truck_id: 1
        // }
        try {
            const response = await pHaulAPI.post('/reservations', bookingData)
            setNewReservation(response.data)
            push('/reservations')
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div id="truck-show-container">
            <div className="truck-details show-container">
                <h1>{truck.year} {truck.make} {truck.model}</h1>
                <h2>Hourly Rate ${truck.hourly_rate}</h2>
                <img src={truck.image} alt={truck.model} />
            </div>
            <Calendar handleBooking={handleBooking} reservations={truck.reservations} cost={truck.hourly_rate}/>
        </div>
    )
}
