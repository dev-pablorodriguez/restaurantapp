import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Icon, Text } from '@rneui/themed'

import FirebaseContext from '../context/firebase/firebaseContext'
import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation }  from '@react-navigation/native'

import globalStyles from '../styles/global'

const FormularioPlatillo = ({ route }) => {
  //state para cantidad
  const [ cantidad, setCantidad ] = useState(1)
  const [ isDecBtnDisabled, setIsDecBtnDisabled ] = useState(true)
  const [ isIncBtnDisabled, setIsIncBtnDisabled ] = useState(false)
  const [ total, setTotal ] = useState(0)

  //context
  const { menu } = useContext(FirebaseContext)
  const { addPedidoItem } = useContext(PedidosContext)

  //obtener platillo con el id recibido como parámetro de ruta
  const { id } = route.params
  const [ platillo ] = menu.filter( platillo => platillo.id === id )
  const { precio } = platillo;

  //navegación
  const navigation = useNavigation();

  //calcular total
  useEffect( () => {
    setTotal(precio*cantidad)
  }, [ cantidad ])

  //handlers botones
  const increment = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;

    if(nuevaCantidad === 99) setIsIncBtnDisabled(true)
    if(nuevaCantidad > 1) setIsDecBtnDisabled(false)

    setCantidad(nuevaCantidad)
  }

  const decrement = () => {
    const nuevaCantidad = parseInt(cantidad) - 1;

    if(nuevaCantidad === 1) setIsDecBtnDisabled(true)
    if(nuevaCantidad < 99) setIsIncBtnDisabled(false)

    setCantidad(nuevaCantidad)
  }

  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas agregar el platillo a tu pedido?',
      'Un platillo agregado no se puede quitar del pedido.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => {
          //Almacenar el pedido en la orden principal
          const { existencia, ...pedido } = platillo;
          pedido.cantidad = cantidad;
          pedido.total = total;

          addPedidoItem(pedido)

          //Navegar hacia ResumenPedido
          navigation.navigate('ResumenPedido')
        }}
      ]
    )
  }

  return (
    <View style={[ globalStyles.contenedor, { justifyContent: 'space-between' } ]}>
      <View>
        <Text style={ globalStyles.title }>Cantidad</Text>
        <View style={ styles.grid }>
          <View style={ styles.col }>
            <Button
              icon={ <Icon name='minus' color='#FFF' size={ 40 } type='antdesign' /> }
              radius='10'
              buttonStyle={ styles.btn }
              onPress={ decrement }
              disabled={ isDecBtnDisabled }
            />
          </View>
          <View style={ styles.col }>
            <Text style={ styles.textAmount }>{ cantidad }</Text>
          </View>
          <View style={ styles.col }>
            <Button
              icon={ <Icon name='plus' color='#FFF' size={ 40 } type='antdesign' /> }
              radius='10'
              buttonStyle={ styles.btn }
              onPress={ increment }
              disabled={ isIncBtnDisabled }
            />
          </View>
        </View>

        <Text style={[ globalStyles.cantidad, styles.cantidad ]}>Subtotal: ${ total }</Text>
      </View>

      <Button
        buttonStyle={[ globalStyles.btn, { marginVertical: 20 } ]}
        titleStyle={ globalStyles.btnText }
        title='Agregar al Pedido'
        onPress={ confirmarOrden }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  col: {
    width: '30%'
  },
  btn: {
    backgroundColor: 'black',
    height: 80
  },
  textAmount: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40
  },
  cantidad: {
    textAlign: 'center'
  }
})

export default FormularioPlatillo