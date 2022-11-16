import { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Avatar, Text, Button, Icon } from '@rneui/themed'

import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import { useNavigation }  from '@react-navigation/native'

import globalStyles from '../styles/global'

import Countdown from 'react-countdown'

const ProgresoPedido = ({ route }) => {
  const { idOrden } = route.params;

  const [ tiempoEntrega, setTiempoEntrega ] = useState(0)
  const [ completado, setCompletado ] = useState(false)

  const navigation = useNavigation();

  useEffect( () => {
    const getProducto = () => {
      firebase.db.collection('ordenes')
        .doc(idOrden)
        .onSnapshot(doc => {
          setTiempoEntrega(doc.data()?.tiempoEntrega ?? 0)
          setCompletado(doc.data()?.completado ?? false)
        })
    }

    getProducto()
  }, [])

  const getCountdown = ({ minutes, seconds }) =>{
    let sec = ''
    if(seconds === 0){
      sec = `00`
    }else if(seconds.toString().length === 1){
      sec = `0${ seconds }`
    }else{
      sec = seconds;
    }

    return `${ minutes }:${ sec }`
  }


  return (
    <View style={ globalStyles.contenedor }>
      <View style={[ globalStyles.contenido, { marginTop: 50 } ]}>
        { tiempoEntrega === 0 ?
          <>
            <Text style={ styles.texto }>¡Hemos recibido tu orden!</Text>
            <Text style={ styles.texto }>Estamos calculando el tiempo de entrega...</Text>
          </>
          :
          completado ?
          <>
            <Text style={ styles.ordenLista }>Orden Lista</Text>
            <Text style={ styles.texto }>Por favor pasa a retirar tu pedido</Text>

            <Button
              buttonStyle={[ globalStyles.btn, { marginTop: 100 } ]}
              titleStyle={ globalStyles.btnText }
              radius='20'
              title='Comenzar una nueva orden'
              onPress={ () => navigation.navigate('NuevaOrden') }
            />
          </>
          :
          <>
            <Text style={ styles.texto }>Tu orden estará lista en:</Text>
            <Text style={ styles.countdown }>
              {/* Convierte los minutos a milisegundos */}
              <Countdown
                date={ Date.now() + tiempoEntrega * 60000 }
                renderer={ getCountdown }
              />
            </Text>
          </>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    textAlign: 'center'
  },
  ordenLista: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  countdown: {
    fontSize: 60,
    textAlign: 'center'
  }
})

export default ProgresoPedido