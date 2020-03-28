import React, { useState, useContext } from 'react';
import { Context } from './../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography
} from '@material-ui/core';
import { 
    GoogleMap, 
    LoadScript, 
    Marker
} from '@react-google-maps/api';
import { updateLocation } from './../context/actions';


const useStyles = makeStyles(theme => ({
    root: {
    },
    map: {
        height: `calc(70vh - ${theme.appBar.height}px)`,
    }
}));

const DisplayMap = ({ airportData }) => {
    const { location, dispatch } = useContext(Context);
    const classes = useStyles();
    const [ city, setCity ] = useState({
        name: null,
        showCity: false
    });

    const markerDataHandler = (marker) => {
        const airport = airportData.filter(curr => {
            return curr.airportId === marker.airportId
        })
        setCity({
            name: airport[0].name,
            showCity: true
        })

        dispatch(updateLocation({lat: marker.location.latitude, lng: marker.location.longitude}));
    }

    const markers = airportData.map(airport => {
        return (<div
            key={airport.airportId}
        >
            <Marker  
                icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                position={{
                    lat: airport.location.latitude,
                    lng: airport.location.longitude
                }}
                onClick={() => markerDataHandler(airport)}
            />
        </div>)
    })

    return (
        <div>
            {city.showCity ? <Typography variant="h5" component="h5" >Airport name: {city.name}</Typography> : null}
            <LoadScript
                googleMapsApiKey="AIzaSyAjHlJRY2IR6u30PkgroKuhzJ5lEkyT0qU"
                loadingElement={<div>Loading...</div>}
            >
                <GoogleMap
                    id="circle-example"
                    mapContainerClassName={classes.map}
                    zoom={10}
                    center={{
                        lat: location.lat,
                        lng: location.lng
                    }}
                >
                {markers}
                <Marker     
                    position={{
                        lat: location.initialLat,
                        lng: location.initialLng
                    }}             
                >

                </Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default DisplayMap;