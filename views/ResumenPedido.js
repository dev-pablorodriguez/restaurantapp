import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { ListItem, Avatar, Text } from '@rneui/themed'

import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation }  from '@react-navigation/native'

import globalStyles from '../styles/global'

const ResumenPedido = () => {
  const { pedido, total, setTotalPagar } = useContext(PedidosContext);

  const navigation = useNavigation();

  useEffect( () => {
    const totalPagar = pedido.reduce((acc, curr) => acc + curr.total, 0);

    setTotalPagar(totalPagar)
  }, [ pedido ])

  return (
    <View style={ globalStyles.contenedor }>
      <Text style={[ globalStyles.title, { marginBottom: 20 } ]}>Resumen Pedido</Text>
      <ScrollView>
        {
          pedido.map( platillo => {
            const { id, nombre, precio, imagen, cantidad } = platillo;

            return (
              <ListItem key={ id } bottomDivider style={{ padding: StyleSheet.hairlineWidth }}>
                <Avatar size='large' source={{ uri: imagen }} />
                <ListItem.Content>
                  <ListItem.Title style={ styles.listItemTitle }>{ nombre }</ListItem.Title>
                  <ListItem.Subtitle style={ styles.listItemSubtitle }>Cantidad: { cantidad }</ListItem.Subtitle>
                  <ListItem.Subtitle style={ styles.listItemSubtitle }>Precio: ${ precio }</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          })
        }

        <Text style={[ globalStyles.cantidad, styles.cantidad ]}>Total a pagar: ${ total }</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  listItemTitle: {
    fontSize: 18
  },
  listItemSubtitle: {
    fontSize: 16
  },
  cantidad: {
    textAlign: 'center'
  }
})

export default ResumenPedido