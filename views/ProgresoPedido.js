import { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Avatar, Text, Button, Icon } from '@rneui/themed'

import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import { useNavigation }  from '@react-navigation/native'

import globalStyles from '../styles/global'

const ProgresoPedido = ({ route }) => {
  const { idOrden } = route.params;

  const [ tiempoEntrega, setTiempoEntrega ] = useState(0)

  useEffect( () => {
    const getProducto = () => {
      firebase.db.collection('ordenes')
        .doc(idOrden)
        .onSnapshot(doc => {
          setTiempoEntrega(doc.data()?.tiempoEntrega ?? 0)
        })
    }

    getProducto()
  }, [])

  return (
    <View style={ globalStyles.contenedor }>
      <View style={[ globalStyles.contenido, { marginTop: 50 } ]}>
        { tiempoEntrega === 0 ?
          <>
            <Text style={{ textAlign: 'center' }}>¡Hemos recibido tu orden!</Text>
            <Text style={{ textAlign: 'center' }}>Estamos calculando el tiempo de entrega...</Text>
          </>
          :
          <>
            <Text style={{ textAlign: 'center' }}>Su orden estará lista en { tiempoEntrega } minutos.</Text>
          </>
        }
      </View>
    </View>
  )
}

export default ProgresoPedido