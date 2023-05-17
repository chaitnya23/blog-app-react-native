import React from 'react'
import {View ,Text} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import tw from 'twrnc'

export default function LoadingScreen({text}) {
  return (
    <View style={tw`h-[100%] absolute z-50 bg-black left-0 right-0 opacity-70`}>
        <View style={tw`m-auto`}>
        <ActivityIndicator size={90}/>
        <Text style={tw`mt-6 text-2xl text-white font-bold`}>{text}</Text>
        </View>
    </View>    
  )
}
