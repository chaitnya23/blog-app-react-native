import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import Login from './login';
import Signup from './signup';
import { NavigationContainer } from '@react-navigation/native';

const stack = createStackNavigator();

export default function Auth() {
    return (
       
            <stack.Navigator>
            <stack.Screen name='signup' component={Signup} options={{ headerShown: false }}  />
            <stack.Screen name='login' component={Login} options={{ headerShown: false }} />
            </stack.Navigator>
       
    )
}
