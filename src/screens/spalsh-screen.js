import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc';

export default function SpalshScreen({ navigation }) {

  useEffect(() => {

    setTimeout(() => {
      navigation.navigate('auth', { screen: 'login' })
    }, 3000);
  }, [])

  return (
    <View style={tw`h-[100%] bg-[#2A2F4F]`}>
      <View style={tw`m-auto`}>
        <Text>splash screen</Text>
      </View>
    </View>
  )
}
