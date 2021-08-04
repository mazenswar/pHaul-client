import React, { useEffect, useState } from 'react'
import months from '../months';

export default function Calendar({handleBooking, reservations, cost}) {
    const [month, setMonth]= useState('Jan');
    const [day, setDay] = useState(1);
    const [startTime, setStartTime] = useState(12);
    const [endTime, setEndTime] = useState(startTime + 1);
    // reset times when moving between dates or months
    useEffect(() => {
        setStartTime(12);
        setEndTime(13);
    }, [day, month])
    ///// TIME PICKER
    function timePicker() {
        const dayReservations = reservations.filter(res => {
            let resDay = new Date(res.start_time).getDate();
            let resMonth = new Date(res.start_time).getMonth() + 1;
            return day === resDay && months[month].number === resMonth;
        })
        const reservedTimes = []
        dayReservations.forEach(res => {
            let starHour = new Date(res.start_time).getHours()
            let endHour = new Date(res.end_time).getHours();
            let time = starHour;
            while (time < endHour) {
                reservedTimes.push(time)
                time++
            }
        })
        const adjustedHours = hours.map( h => {
            return reservedTimes.includes(h) ? <option key={h} value={h} disabled>{formattedHours[h]}</option> : <option key={h} value={h}>{formattedHours[h]}</option>
        })
        // END TIME 
        let endAdjustedHours = hours.filter(hrs => hrs > startTime)
        endAdjustedHours = endAdjustedHours.map(h => {
            return reservedTimes.includes(h) ? <option key={h} value={h} disabled>{formattedHours[h]}</option> : <option key={h} value={h}>{formattedHours[h]}</option>
        })
        return (
            <>
                <label>Start Time</label>
                <select value={startTime} onChange={({target}) => {
                    let val = parseInt(target.value)
                    setStartTime(val);
                    if(val > endTime || val === endTime) setEndTime(val + 1)
                }}>
                    {adjustedHours}
                </select>
                <label>End Time</label>
                <select value={endTime} onChange={({target}) => setEndTime(parseInt(target.value))}>
                    {startTime === 0 ? adjustedHours : endAdjustedHours}
                </select>
            </>
        )
    }
////////////////////////////////////////////
    function handleMonthPicker(e) {
        setMonth(e.target.value);
    }
///////////////////////////////////////////
    function dayPicker() {
        let monthObj = months[month];
        let days = [...Array(monthObj.days).keys()];
        days = days.map(d => d + 1);
        return (
            <div className="day-picker">
                {days.map(d => {
                    return d === day ? <span  key={`day-${d}`} className="day active-day">{d}</span> : <span key={`day-${d}`}  className="day" onClick={() => setDay(d)}>{d}</span>})}
            </div>
        )
    }
//////////////////////////////////////////////////
    function monthPicker() {
        const options = []
        for (let key in months) {
            options.push(<option key={key} value={key}>{months[key].name}</option>)
        }
        return (
            <select value={month} onChange={handleMonthPicker}>
                {options}
            </select>
        )
    }
    console.log(startTime, endTime);
    // calc cost
    function calculateCost() {
        const totalBookingHours = (endTime - startTime)
        const totalCost = totalBookingHours * cost
        return totalCost
    }

    function bookTruck() {
        const year = new Date().getFullYear();
        let startDate = new Date(`${month}, ${day} ${year}`);
        startDate.setHours(startTime);
        let endDate = new Date(`${month}, ${day} ${year}`);
        endDate.setHours(endTime);
        let data = {
            total_price: calculateCost(),
            start_time: startDate,
            end_time: endDate
        }
        handleBooking(data)
    }

    return (
        <div id="calendar-container" className="show-container">
            {monthPicker()}
            {dayPicker()}
            {timePicker()}
            {<h3>Total is ${calculateCost()}</h3>}
            <button onClick={bookTruck}>Book</button>
        </div>
    )
}


const hours = [...Array(24).keys()]

const formattedHours = {
    0: '12:00am',
    1: '1:00am',
    2: '2:00am',
    3: '3:00am',
    4: '4:00am',
    5: '5:00am',
    6: '6:00am',
    7: '7:00am',
    8: '8:00am',
    9: '9:00am',
    10: '10:00am',
    11: '11:00am',
    12: '12:00pm',
    13: '1:00pm',
    14: '2:00pm',
    15: '3:00pm',
    16: '4:00pm',
    17: '5:00pm',
    18: '6:00pm',
    19: '7:00pm',
    20: '8:00pm',
    21: '9:00pm',
    22: '10:00pm',
    23: '11:00pm',
}