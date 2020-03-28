export const setInitial = (data) => {
    return {
        type: 'INITIAL',
        payload: data
    }
}

export const updateLocation = (data) => {
    return {
        type: 'UPDATE',
        payload: data
    }
}

