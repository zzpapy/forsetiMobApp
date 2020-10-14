import React from 'react';
import Home from './Home';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {decode, encode} from 'base64-js'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }
 
 
const RootStack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;