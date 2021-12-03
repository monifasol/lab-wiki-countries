import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import axios from "axios"

const apiURL = "https://ih-countries-api.herokuapp.com/countries"

const CountryDetails = (props) => {
        
    const params = useParams()              // Take the params from the Url (Also in props.match.params)

    const [country, setCountry] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( ()=> {
        axios.get(`${apiURL}/${params.alpha3Code}`)
            .then( response => {
                setCountry(response.data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    } , [props.match.params])  // so that it runs useEffect every time user clicks new country

    return (
        <div className="single-country">
            { isLoading && !country && <p>Nothing to show</p> }  
            { !isLoading && 
                <div className="country-details">
                    <p className="flag-img"><img src={`https://flagpedia.net/data/flags/w1160/${country.alpha2Code.toLowerCase()}.png`} /></p>
                    <p className="official-name">{country.name.official}</p>
                    <p><span>Capital:</span> {country.capital}</p>
                    <p><span>Region:</span> {country.region}</p>
                    <p><span>Subregion:</span> {country.subregion}</p>
                    <p><span>Area:</span> {country.area} Km2</p>
                    <p><span>Borders: </span>
                        { country.borders.map( (border, i) => {
                            return (
                                <p>
                                <Link to={`/country-details/${border}`} key={i} >
                                    {border}
                                </Link>
                                </p>
                            )
                        }) }
                    </p>
                </div>
             } 
        </div>
    )
}

export default CountryDetails
