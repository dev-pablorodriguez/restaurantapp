import React, { useContext } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Card, Button } from '@rneui/themed'

import FirebaseContext from '../context/firebase/firebaseContext'
import { useNavigation }  from '@react-navigation/native'

import globalStyles from '../styles/global'

const DetallePlatillo = ({ route }) => {
  const { id } = route.params
  const { menu } = useContext(FirebaseContext)
  const [ platillo ] = menu.filter( platillo => platillo.id === id )
  const { nombre, precio, imagen, descripcion } = platillo;

  const navigation = useNavigation();

  return (
    <View style={ globalStyles.contenedor }>
      <ScrollView>
          <Card containerStyle={{ borderRadius: 5 }}>
            <Card.Title h2>{ nombre }</Card.Title>
            <Card.Divider />
            <Card.Image style={{ height: 300 }} source={{ uri: imagen }} />

            <Text style={ globalStyles.cantidad }>Precio: ${ precio }</Text>
            <Text style={{ textAlign: 'justify' }}>{ descripcion }</Text>
          </Card>
      </ScrollView>
      <Button
        buttonStyle={[ globalStyles.btn, { marginVertical: 20 } ]}
        titleStyle={ globalStyles.btnText }
        radius='20'
        title='Ordenar Platillo'
        onPress={ () => navigation.navigate('FormularioPlatillo') }
      />
    </View>
  )
}

export default DetallePlatillo