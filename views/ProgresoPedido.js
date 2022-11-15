import { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Avatar, Text, Button, Icon } from '@rneui/themed'

import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation }  from '@react-navigation/native'

import globalStyles from '../styles/global'

const ProgresoPedido = ({ route }) => {
  const { idOrden } = route.params;

  return (
    <Text>{ idOrden }</Text>
  )
}

export default ProgresoPedido