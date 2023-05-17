/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ActivityIndicator, TextInput, Button, MD2Colors } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import tw from 'twrnc';
import { Auth, HomeNavigator, Blog } from './src/screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import SpalshScreen from './src/screens/spalsh-screen';
import AppContext from './src/context/appContext';


const stack = createStackNavigator();

function App() {

  return (

    <NavigationContainer>
      <AppContext>
        <stack.Navigator>
          <stack.Screen name='auth' component={Auth} options={{ headerShown: false }} />
          <stack.Screen name='app-home' component={HomeNavigator} options={{ headerShown: false }} />
          <stack.Screen name='blog' component={Blog} options={{ headerShown: false }} />
          <stack.Screen name='splashScreen' component={SpalshScreen} options={{ headerShown: false }} />
        </stack.Navigator>
      </AppContext>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({

  upBox1: {
    width: 320,
    height: 320,
    backgroundColor: "red",
    borderRadius: 200,
    position: 'absolute',
    top: -80,
    left: -90
  },
  upBox2: {
    width: 320,
    height: 320,
    backgroundColor: "blue",
    borderRadius: 200,
    position: 'absolute',
    top: -150,
    right: -90
  }
})

export default App;
