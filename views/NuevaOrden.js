import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../styles/global'

const NuevaOrden = () => {
  const navigation = useNavigation();

  return (
    <View style={ globalStyles.contenedor }>
      <View style={[ globalStyles.contenido, styles.contenido ]}>
        <Button
          buttonStyle={ globalStyles.btn }
          titleStyle={ globalStyles.btnText }
          radius='20'
          title='Crear Nueva Orden'
          onPress={ () => navigation.navigate('Menu') }
        />
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  contenido: {
    justifyContent: 'center'
  }
})

export default NuevaOrden