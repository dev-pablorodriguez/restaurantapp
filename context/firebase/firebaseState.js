import React, { useReducer } from 'react'
import firebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'

const FirebaseState = ({ children }) => {
    //crear state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(firebaseReducer, initialState)

    return (
        <FirebaseContext.Provider value={{ ...state }}>
            { children }
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;