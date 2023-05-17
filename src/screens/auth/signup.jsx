import React, { useContext, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Button, Provider, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import ProfilePicModel from '../../components/ProfilePicModel';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import LoadingScreen from '../loading-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../../context/appContext';

export default function Signup({ navigation }) {

  const [visible, setvisible] = useState(false);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [profilePic, setprofilePic] = useState(null);
  const [userName, setuserName] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [imgName, setimgName] = useState(null);
  const [profilePicUrl, setprofilePicUrl] = useState(null);
  const [loadingState, setloadingState] = useState({ loading: false, text: "" });

  const { user, setuser } = useContext(Context);

  const uploadImage = async () => {
    console.log(imgName, "image");
    setloadingState({ loading: true, text: "uploading profile picture...." })
    try {
      const reference = storage().ref(imgName);

      await reference.putFile(profilePic);
      const url = await storage().ref(imgName).getDownloadURL();
      setprofilePicUrl(url);
      setloadingState({ ...loadingState, loading: false });
    } catch (error) {
      console.log(error);
      setloadingState({ ...loadingState, loading: false });

    }
  }

  // sign up user  

  const signup_user = async () => {

    if (confirmPassword !== password) {
      console.warn("confirm password is not matching");
      return;
    } else if (!userName || !password || !email) {
      console.warn("please fill the details properly");
      return;
    }

    try {

      setloadingState({ loading: true, text: "signing up...." });

      const _id = uuid.v4();

      firestore()
        .collection('users')
        .doc(_id)
        .set({
          userName, email, password, profilePic: profilePicUrl?profilePicUrl:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", id: _id
        })
        .then(async (res) => {
          console.log(res);
          setloadingState({ ...loadingState, loading: false });
          setuser({userName, email, password, profilePic: profilePicUrl, id: _id})
          // store user to app storage
          await AsyncStorage.setItem('userInfo', JSON.stringify({userName, email, password, profilePic: profilePicUrl, id: _id}));

          navigation.navigate('app-home', { screen: "categories" })

        }).catch(err=>{
          throw new Error("error in signing in");
        })
    } catch (error) {
      console.log(error);
      setloadingState({ ...loadingState, loading: false });

    }
  }

  return (
    <Provider>
      <View style={tw`bg-white h-[100%]`}>
        {loadingState.loading && <LoadingScreen text={loadingState.text} />}
        <ProfilePicModel visible={visible} setprofilePic={setprofilePic} profilePic={profilePic} cancel={() => setvisible(false)} setimgName={setimgName} uploadImage={uploadImage} />

        <View style={tw`h-125 w-125 absolute  -top-90 -left-30 bg-[#2A2F4F] my-3 rounded-full`}></View>
        <View style={tw`h-125 w-125 absolute  -top-90 -right-60 bg-[#E5BEEC] my-3 rounded-full`}></View>

        <View style={tw`flex flex-col gap-5 relative top-45 w-[85%] mx-auto`}>
          <TextInput label={'Email'} mode='outlined' value={email} onChangeText={(text) => setemail(text)} />
          <TextInput label={'user name'} mode='outlined' value={userName} onChangeText={(text) => setuserName(text)} />
          <TextInput secureTextEntry={true} label={'password'} mode='outlined' value={password} onChangeText={(text) => setpassword(text)} />
          <TextInput secureTextEntry={true} label={'confirm password'} mode='outlined' value={confirmPassword} onChangeText={(text) => setconfirmPassword(text)} />
          <Button mode='elevated' icon={'account'} onPress={() => setvisible(true)}>select a profile picture</Button>
          <Button uppercase mode='contained' style={tw`bg-[#917FB3]`} onPress={signup_user}>Sign up</Button>
          <Pressable onPress={() => navigation.navigate('login')}>
            <Text style={tw`text-[4] text-blue-600`}>already have an account ? login </Text>
          </Pressable>

        </View>
      </View>
    </Provider>
  )
}
