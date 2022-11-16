import React, { useReducer } from 'react'
import pedidosReducer from './pedidosReducer'
import PedidosContext from './pedidosContext'

import {
    ADD_PEDIDO_ITEM,
    SET_TOTAL_PAGAR,
    DEL_ITEM_PEDIDO,
    REINICIAR_PEDIDO
} from '../../reducerTypes'

const PedidosState = ({ children }) => {
    //crear state inicial
    const initialState = {
        pedido: [],
        total: 0
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

    //Actualizar el total a pagar
    const setTotalPagar = total => {
        dispatch({
            type: SET_TOTAL_PAGAR,
            payload: total
        })
    }

    //Eliminar un elemento del pedido
    const delItemPedido = id => {
        dispatch({
            type: DEL_ITEM_PEDIDO,
            payload: id
        })
    }

    const reiniciarPedido = () => {
        dispatch({
            type: REINICIAR_PEDIDO
        })
    }

    return (
        <PedidosContext.Provider
            value={{
                ...state,
                addPedidoItem,
                setTotalPagar,
                delItemPedido,
                reiniciarPedido
            }}
        >
            { children }
        </PedidosContext.Provider>
    )
}

export default PedidosState;