import { GET_PRODUCTOS } from '../../reducerTypes'

export default (state, action) => {
    switch(action.type){
        case GET_PRODUCTOS:
            return { ...state, menu: action.payload}


        default:
            return state;
    }
}