const reducer = (state, action) => {
    switch(action.type){
        case 'INITIAL':
            return {
                ...state,
                initialLat: action.payload.lat,
                initialLng: action.payload.lng
            }
        case 'UPDATE':
            return {
                ...state,
                lat: action.payload.lat,
                lng: action.payload.lng
            }
        default:
            return state;
    }
}

export default reducer;