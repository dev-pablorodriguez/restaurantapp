import React, { useReducer } from 'react'
import firebase from '../../firebase'
import firebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'

import { GET_PRODUCTOS } from '../../reducerTypes'

const FirebaseState = ({ children }) => {
    //crear state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(firebaseReducer, initialState)

    //getProductos
    const getProductos = () => {
        firebase.db
            .collection('productos')
            .where('existencia', '==', true)
            .onSnapshot( snapshot => {
                const platillos = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                dispatch({
                    type: GET_PRODUCTOS,
                    payload: platillos
                })
            });
    }

    return (
        <FirebaseContext.Provider value={{ ...state, firebase, getProductos }}>
            { children }
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;