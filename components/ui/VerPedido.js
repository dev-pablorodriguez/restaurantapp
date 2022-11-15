import { useContext } from 'react'
import { Button, Icon }  from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

import PedidosContext from '../../context/pedidos/pedidosContext'

import globalStyles from '../../styles/global'

const VerPedido = () => {
    const { pedido } = useContext(PedidosContext);
    const navigation = useNavigation();

    return (
        pedido.length > 0 &&

        <Button
            type='clear'
            title='Pedido'
            icon={ <Icon name='shopping-cart' /> }
            titleStyle={ globalStyles.btnText }
            onPress={ () => navigation.navigate('ResumenPedido') }
        />
    )
}

export default VerPedido