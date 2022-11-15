import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

//Views
import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

//Components
import VerPedido from './components/ui/VerPedido';

//importar state de context
import FirebaseState from './context/firebase/firebaseState';
import PedidosState from './context/pedidos/pedidosState';

const App = () => {
  return (
    <FirebaseState>
      <PedidosState>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FFDA00'}, headerTitleStyle: { fontWeight: 'bold' }, headerTitleAlign: 'center', headerTintColor: '#000' }}>
            <Stack.Screen name='NuevaOrden' component={ NuevaOrden } options={{ title: 'Nueva Orden' }} />
            <Stack.Screen name='Menu' component={ Menu } options={{ title: 'Nuestro Menú', headerRight: () => <VerPedido /> }} />
            <Stack.Screen name='DetallePlatillo' component={ DetallePlatillo } options={{ title: 'Detalle Platillo' }} />
            <Stack.Screen name='FormularioPlatillo' component={ FormularioPlatillo } options={{ title: 'Ordenar Platillo' }} />
            <Stack.Screen name='ResumenPedido' component={ ResumenPedido } options={{ title: 'Resumen Pedido' }} />
            <Stack.Screen name='ProgresoPedido' component={ ProgresoPedido } options={{ title: 'Progreso Pedido' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PedidosState>
    </FirebaseState>
  );
};

export default App;
