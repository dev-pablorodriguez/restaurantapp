import React, { useReducer } from 'react'
import firebase from '../../firebase'
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
        <FirebaseContext.Provider value={{ ...state, firebase }}>
            { children }
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;