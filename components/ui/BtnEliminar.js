import { useContext } from 'react'
import { Alert } from 'react-native'
import { Button, Icon }  from '@rneui/themed'

import PedidosContext from '../../context/pedidos/pedidosContext'

import globalStyles from '../../styles/global'

const BtnEliminar = ({ id }) => {
    const { delItemPedido } = useContext(PedidosContext);

    const deleteFromPedido = () => {
        Alert.alert(
            'Remover elemento',
            '¿Seguro deseas eliminar este platillo de tu pedido?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: () => {
                delItemPedido(id);
              }}
            ]
        )
    }

    return (
        <Button
            color='error'
            buttonStyle={{ minHeight: '100%' }}
            icon={ <Icon color='#FFF' name='delete' type='antdesign' size={ 50 } /> }
            titleStyle={ globalStyles.btnText }
            onPress={ deleteFromPedido }
        />
    )
}

export default BtnEliminar