import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import { ListItem, Avatar } from '@rneui/themed'
import globalStyles from '../styles/global'


const Menu = () => {

  const { menu, getProductos } = useContext(FirebaseContext);

  useEffect( () => {
    getProductos()
  }, [])

  return (
    <View style={ globalStyles.contenedor }>
      <View>
        <ScrollView>
          {
            menu.map( platillo => {
              const { id, nombre, precio, categoria, imagen, descripcion } = platillo;

              return (
                <ListItem key={ id } bottomDivider>
                  <Avatar size='large' source={{ uri: imagen }} />
                  <ListItem.Content>
                    <ListItem.Title>{ nombre }</ListItem.Title>
                    <ListItem.Subtitle>{ descripcion }</ListItem.Subtitle>
                    <ListItem.Subtitle>{ precio }</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default Menu