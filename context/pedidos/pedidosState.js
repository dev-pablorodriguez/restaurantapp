import React, { useReducer } from 'react'
import pedidosReducer from './pedidosReducer'
import PedidosContext from './pedidosContext'

import { ADD_PEDIDO_ITEM } from '../../reducerTypes'

const PedidosState = ({ children }) => {
    //crear state inicial
    const initialState = {
        pedido: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(pedidosReducer, initialState)

    //Agregar pedido a la orden principal
    const addPedidoItem = pedido => {
        dispatch({
            type: ADD_PEDIDO_ITEM,
            payload: pedido
        })
    }

    return (
        <PedidosContext.Provider value={{ ...state, addPedidoItem }}>
            { children }
        </PedidosContext.Provider>
    )
}

export default PedidosState;