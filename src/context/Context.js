import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { updateLocation, setInitial } from './actions';

export const Context = createContext();
const initialState = {
  initialLat: null,
  initialLng: null,
  lat: null,
  lng: null
}

const Provider = ({children}) => {
    const [location, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos=>{
            dispatch(updateLocation({
              lat: pos.coords.latitude, 
              lng: pos.coords.longitude}
              ))
            dispatch(setInitial({
              lat: pos.coords.latitude, 
              lng: pos.coords.longitude}
            ))
          })
        }
      }, [])

    return (
        <Context.Provider value={{location, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export default Provider;