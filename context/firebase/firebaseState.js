import React, { useReducer } from 'react'
import firebase from '../../firebase'
import firebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'

import _ from 'lodash'

import { GET_PRODUCTOS } from '../../reducerTypes'

const FirebaseState = ({ children }) => {
    //crear state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(firebaseReducer, initialState)

    //consultar en la base de datos de Firebase
    const getProductos = () => {
        firebase.db
            .collection('productos')
            .where('existencia', '==', true)
            .onSnapshot( snapshot => {
                let platillos = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                //Ordenar por categoría con lodash
                platillos = _.sortBy(platillos, 'categoria')

                //Modifcar el estado con los resultados de la base de datos
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