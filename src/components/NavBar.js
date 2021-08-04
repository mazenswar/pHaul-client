import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({setLogged}) {
    function handleLogout() {
        localStorage.clear()
        setLogged(false);
    }
    return (
        <nav>
            <Link to="/">Trucks</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
        </nav>
    )
}
