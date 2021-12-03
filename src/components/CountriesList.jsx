import React from 'react'
import logo from "../logo.svg"
import axios from "axios";
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";

const apiURL = "https://ih-countries-api.herokuapp.com/countries"

const CountriesList = (props) => {

    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( ()=> {
        axios.get(apiURL)
            .then( response => {
                setCountries(response.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    },[]) // runs only once

    return (
        <div className="countries-list">

            { isLoading 
                    && 
                <p className="loading">
                    Loading countriesData
                    <img src={logo} className="spinner" alt="spinner"/>
                </p> 
            }
            
            { !isLoading && countries.length === 0 ? 
                <p> Sorry, no countries found!</p>
                    :
                    null
            }

            { countries.map( (country) => {
                
                return (
                    <Link to={`/country-details/${country.alpha3Code}`} key={country._id} >
                        <div className="country-thumbnail">
                            <img alt={`flag from ${country.name.common}`} src={`https://flagpedia.net/data/flags/w1160/${country.alpha2Code.toLowerCase()}.png`} />
                            {country.name.common}
                        </div>
                    </Link>
                )
            }) }
        </div>
    )
}

export default CountriesList
