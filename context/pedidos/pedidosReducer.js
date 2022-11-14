import { ADD_PEDIDO_ITEM } from '../../reducerTypes'

export default (state, action) => {
    switch(action.type){
        case ADD_PEDIDO_ITEM:
            return { ...state, pedido: [ ...state.pedido, action.payload ] }

        default:
            return state;
    }
}