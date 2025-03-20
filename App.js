import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import EditContactScreen from './src/screens/EditContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Lista de contatos' }} />
        <Stack.Screen name='AddContact' component={AddContactScreen} options={{ title: 'Adicionar contato' }}/>
        <Stack.Screen name='EditContact' component={EditContactScreen} options={{ title: 'Editar contato' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
