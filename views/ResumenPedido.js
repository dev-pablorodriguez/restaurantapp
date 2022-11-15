import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import { ListItem, Avatar, Text, Button, Icon } from '@rneui/themed'

import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation }  from '@react-navigation/native'
import firebase from '../firebase'

import BtnEliminar from '../components/ui/BtnEliminar'

import globalStyles from '../styles/global'

const ResumenPedido = () => {
  const { pedido, total, setTotalPagar } = useContext(PedidosContext);

  const navigation = useNavigation();

  useEffect( () => {
    const totalPagar = pedido.reduce((acc, curr) => acc + curr.total, 0);

    setTotalPagar(totalPagar)

    //Redirecciona automáticamente al menú si el pedido está vacío
    if(pedido.length === 0) navigation.navigate('Menu')
  }, [ pedido ])

  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas finalizar tu compra?',
      'Una vez finalizada tu compra no podrás agregar más productos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: async () => {

          //Generar pedido para Firebase
          const pedidoFinal = {
            tiempoEntrega: 0,
            completado: false,
            total: Number(total),
            orden: pedido,
            created: Date.now()
          }

          //Escribir en Firebase
          try {
            const pedido = await firebase.db.collection('ordenes').add(pedidoFinal);

            //Navegar hacia ProgresoPedido
            navigation.navigate('ProgresoPedido', { idOrden: pedido.id })

          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )
  }

  return (
    <View style={ globalStyles.contenedor }>
      <Text style={[ globalStyles.title, { marginBottom: 20 } ]}>Resumen Pedido</Text>
      <ScrollView>
        {
          pedido.map( platillo => {
            const { id, nombre, precio, imagen, cantidad } = platillo;

            return (
              <ListItem.Swipeable
                key={ id }
                bottomDivider
                style={{ padding: StyleSheet.hairlineWidth }}
                rightContent={ <BtnEliminar id={ id } /> }
              >
                <Avatar size='large' source={{ uri: imagen }} />
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 18 }}>{ nombre }</ListItem.Title>
                  <ListItem.Subtitle style={{ fontSize: 16 }}>Cantidad: { cantidad }</ListItem.Subtitle>
                  <ListItem.Subtitle style={{ fontSize: 16 }}>Precio: ${ precio }</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            )
          })
        }

        <Text style={[ globalStyles.cantidad, { textAlign: 'center' } ]}>Total a pagar: ${ total }</Text>

        <Button
          color='black'
          buttonStyle={{ margin: 20 }}
          titleStyle={ styles.btnSeguirPidiendo }
          title='Seguir Pidiendo'
          onPress={ () => navigation.navigate('Menu') }
        />
      </ScrollView>

      <Button
        buttonStyle={[ globalStyles.btn, { marginVertical: 20 } ]}
        titleStyle={ globalStyles.btnText }
        title='Finalizar Compra'
        onPress={ confirmarOrden }
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  btnSeguirPidiendo: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})

export default ResumenPedido