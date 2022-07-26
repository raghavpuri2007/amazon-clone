import React from 'react'
import "./Address.css"
import {Search, GpsFixed} from "@material-ui/icons"
import { useEffect } from 'react'
import { useRef } from 'react'

const apiKey = process.env.VITE_APP_GMAP_API_KEY
const mapApiJs = "https://maps.googleapis.com/maps/api/js"

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script")
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script))
        document.head.appendChild(script);
    })
}

function Address() {
    const searchInput = useRef(null);

    const initMapScript = () => {
        //if script already loaded
        if(window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src)
    }

    const initAutocomplete = () => {
        if(!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current)
        autocomplete.setFields(["address_component", "geometry"])
    }

    useEffect(() => {
        initMapScript().then(() => initAutocomplete());
    }, [])
  return (
    <div className="address">
    <div className="input">
        <span><Search /></span>
        <input ref={searchInput} type='text' placeholder='Enter address'/>
        <button><GpsFixed /></button>
        </div>
    <div className="result">
        <p>City: <span>...</span></p>
        <p>State: <span>...</span></p>
        <p>Zip: <span>...</span></p>
        <p>Country <span>...</span></p>
    </div>
    </div>
  )
}

export default Address