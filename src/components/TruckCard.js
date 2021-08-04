import React from 'react'
import { Link } from 'react-router-dom'

export default function TruckCard({truck}) {
    return (
        <Link className="truck-card" to={`/trucks/${truck.id}`}>
            <img src={truck.image} alt={truck.model}/>
            <div className="card-details">
                <h3>{truck.year} {truck.make } {truck.model}</h3>
                <h3>Hourly Rate ${truck.hourly_rate}</h3>
            </div>
        </Link>
    )
}
