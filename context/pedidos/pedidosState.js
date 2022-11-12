import React, { useReducer } from 'react'
import pedidosReducer from './pedidosReducer'
import PedidosContext from './pedidosContext'

const PedidosState = ({ children }) => {
    //crear state inicial
    const initialState = {
        pedido: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(pedidosReducer, initialState)

    return (
        <PedidosContext.Provider value={{ ...state }}>
            { children }
        </PedidosContext.Provider>
    )
}

export default PedidosState;