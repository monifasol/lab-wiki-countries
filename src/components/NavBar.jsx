import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <h2> LAB - WikiCountries </h2>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/countries-list">Countries List</Link>
            </div>
        </nav>
    )
}

export default NavBar
