import React, {useContext} from 'react'
import TruckCard from '../components/TruckCard'
import { Context as MainContext } from '../context/mainContext'

export default function Home() {
    const {state: {trucks}} = useContext(MainContext)
    return (
        <div className="truck-cards-container">
            {trucks.length ? trucks.map(t => <TruckCard key={t.vin}truck={t} />) : null}
        </div>
    )
}
