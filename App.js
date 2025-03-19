import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddContactScreen from './src/screens/AddContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Contatos' }} />
        <Stack.Screen name='AddContact' component={AddContactScreen} options={{ title: 'Adicionar contato' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
