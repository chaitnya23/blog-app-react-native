import React, { useEffect, useState ,useContext } from 'react';
import { View, Text, SafeAreaView, Pressable, Image  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput, Button } from 'react-native-paper';
//import { Svg, Image } from 'react-native-svg';
const loginImgSrc = require('../../assets/login-img.png')
import tw from 'twrnc';
import firestore from '@react-native-firebase/firestore';
import LoadingScreen from '../loading-screen';
import { Context } from '../../context/appContext';

export default function Login({ navigation }) {

  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [loading, setloading] = useState(false);
  const {setuser} = useContext(Context);

  const login_user = async () => {

    setloading(true);
    try {
      console.log(email, password);
      const data = await firestore().collection('users')
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      if (data._docs.length != 0) {
        console.warn("logged in success fully", data._docs);
        setuser(data._docs[0]._data)
        // store user to app storage
        await AsyncStorage.setItem('userInfo' ,JSON.stringify(data._docs[0]._data));
        
        navigation.navigate('app-home')
      } 
      setloading(false);
    } catch (error) {
      setloading(false); 
      console.warn("user name /password incorrect" ,error);
    }
  }


  return (
    <SafeAreaView style={tw`flex h-[100%] bg-[#2A2F4F]  relative items-center`}>

      {loading &&  <LoadingScreen text="logging in...." />}
      <Image source={loginImgSrc} style={tw`h-60 w-100 relative top-[10%]`} />
      <View style={tw`w-[99%] rounded-2xl bg-white absolute -bottom-10 p-4 shadow-lg `}>

        <TextInput label={'email'} mode="fit" style={tw`bg-white`} value={email} onChangeText={(text) => setemail(text)} />
        <TextInput secureTextEntry={true} label={'password'} mode="fit" style={tw`bg-white mt-5`} value={password} onChangeText={(text) => setpassword(text)} />
        <Button uppercase onPress={login_user} mode="contained" style={tw`bg-orange-400 shadow-xl mt-10 bg-[#917FB3] font-bold`}>
          Log in
        </Button>

        <View style={tw`mt-5`}>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={tw`text-[4] text-blue-600`}>don't have an account ? sign up </Text>

          </Pressable>
        </View>

        <View style={tw`h-20`}></View>
      </View>
    </SafeAreaView>
  );
}
