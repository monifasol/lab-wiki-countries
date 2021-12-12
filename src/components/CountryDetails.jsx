import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import axios from "axios"

const apiURL = "https://ih-countries-api.herokuapp.com/countries"
const flagBaseURL = "https://flagpedia.net/data/flags/w1160"

const CountryDetails = (props) => {
        
    const params = useParams()       // Take the params from the Url (Also in props.match.params)
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect( ()=> {
        axios.get(`${apiURL}`)
            .then( response => {
                setCountries(response.data)
            })
            .catch(error => {
                setIsError(true)
                console.log(error)
            })
    } , []) // runs once

    useEffect( ()=> {
        axios.get(`${apiURL}/${params.id}`)
            .then( response => {
                setCountry(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                setIsError(true)
                console.log(error)
            })
    } , [params.id])      // so that it runs useEffect every time user clicks new country


    const getBorders = (country) => {
        let borders = []

        if (country.borders !== undefined ) {
            country.borders.forEach( (border) => {
                countries.forEach( (c) => {
                    if (c.alpha3Code.toLowerCase() === border.toLowerCase() ) 
                        borders.push(c)
                })
            })
        }
        return borders
    }    

    if (isError) return <Redirect to="error/no-country" />;
    else
      return (
        <div className="single-country">
            { isLoading && !country && <p>Nothing to show</p> }  
            { !isLoading && 
                <div className="country-details">
                    <p className="flag-img"><img src={`${flagBaseURL}/${country.alpha2Code.toLowerCase()}.png`} alt={`flag-${country.name}`} /></p>
                    <p className="official-name">{country.name.official}</p>
                    <p><span>Capital:</span> {country.capital}</p>
                    <p><span>Region:</span> {country.region}</p>
                    <p><span>Subregion:</span> {country.subregion}</p>
                    <p><span>Area:</span> {country.area} Km2</p>
                    <p>
                        { getBorders(country).length > 0 && <span> Borders: </span> }
                        { getBorders(country).length > 0 && getBorders(country).map( (borderCountry) => {
                            return (
                                <span className="link" key={borderCountry.alpha3Code}>
                                    <Link to={`/${borderCountry.alpha3Code}`} > 
                                        {borderCountry.name.common}
                                    </Link>
                                </span>
                            )
                        }) }
                    </p>
                </div>
             } 
        </div>
      )
}

export default CountryDetails
