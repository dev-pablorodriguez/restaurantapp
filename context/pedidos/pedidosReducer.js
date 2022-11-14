import { ADD_PEDIDO_ITEM, SET_TOTAL_PAGAR } from '../../reducerTypes'

export default (state, action) => {
    switch(action.type){
        case ADD_PEDIDO_ITEM:
            let existsInPedido = false;

            //Si el platillo ya se encuentra en la orden del cliente
            //actualiza la cantidad y el total en lugar de agregarlo nuevamente
            const pedido = state.pedido.map(platillo => {
                if(platillo.id === action.payload.id){

                    const { cantidad, total } = action.payload

                    platillo.cantidad += cantidad;
                    platillo.total += total

                    existsInPedido = true;
                }

                return platillo;
            })

            return existsInPedido ? { ...state, pedido } : { ...state, pedido: [ ...state.pedido, action.payload ] }

        case SET_TOTAL_PAGAR:
            return { ...state, total: action.payload }

        default:
            return state;
    }
}