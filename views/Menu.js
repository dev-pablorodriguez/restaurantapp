import React, { useEffect, useContext, Fragment } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import { ListItem, Avatar, Text } from '@rneui/themed'
import globalStyles from '../styles/global'


const Menu = () => {

  const { menu, getProductos } = useContext(FirebaseContext);

  useEffect( () => {
    getProductos()
  }, [])

  const mostrarHeaderCategoria = (categoria, idx) => {
    const isPrintingHeader = idx === 0 || categoria !== menu[ idx - 1 ].categoria; 

    if(isPrintingHeader){
      return (
        <View style={ styles.separador }>
          <Text style={ styles.separadorTexto }>{ categoria }</Text>
        </View>
      )
    }
  }

  return (
    <View style={ globalStyles.contenedor }>
      <View>
        <ScrollView>
          {
            menu.map(( platillo, idx ) => {
              const { id, nombre, precio, categoria, imagen, descripcion } = platillo;

              return (
                <Fragment key={ id }>
                  { mostrarHeaderCategoria(categoria, idx) }

                  <ListItem bottomDivider style={{ padding: StyleSheet.hairlineWidth }}>
                    <Avatar size='large' source={{ uri: imagen }} />
                    <ListItem.Content>
                      <ListItem.Title>{ nombre }</ListItem.Title>
                      <ListItem.Subtitle>{ descripcion }</ListItem.Subtitle>
                      <ListItem.Subtitle>{ precio }</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                </Fragment>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
    padding: 10
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default Menu