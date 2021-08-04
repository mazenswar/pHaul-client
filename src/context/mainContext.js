import { createContext, useReducer } from "react";

function reducer(state, {type, payload}) {
    switch(type) {
        case 'SET_TRUCKS':
            return {...state, trucks: payload};
        case 'SET_USER':
            return {...state, user: payload}
        case 'DELETE_RES':
            const newReservations = [...state.user.reservations].filter(res => res.id !== parseInt(payload))
            return {...state, user: {...state.user, reservations: newReservations}}
        case 'NEW_RES':
            return {...state, user: {...state.user, reservations: [...state.user.reservations, payload]}}
        default:
            return state;
        
    }
}
const initialState = { user: {}, trucks: []}

const Context = createContext();
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = {
        setTrucks: (trucks) => dispatch({type: 'SET_TRUCKS', payload: trucks}),
        setUser: (user) => dispatch({type: 'SET_USER', payload: user}),
        updateUserReservations: (id) => dispatch({type: 'DELETE_RES', payload: id}),
        setNewReservation: (res) => dispatch({type: 'NEW_RES', payload: res})
    }
    return (
        <Context.Provider value={{state, ...actions}}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider };