import React, { createContext, useEffect, useState } from 'react'
import { View ,PermissionsAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const Context = createContext();

export default function AppContext({children}) {

    const navigation = useNavigation();

    const [user, setuser] = useState({});
    const [blogs, setblogs] = useState([]);
    const [permissionGranted, setpermissionGranted] = useState(false);



    useEffect(() => {
        const requestGallaryPermission =async()=> {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your gallry.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //console.log('Camera permission granted');
                    setpermissionGranted(true);
                } else {
                    console.log('Camera permission denied');
                    //cancel();
                }
            } catch (err) {
                console.warn(err);
            }
        }
        
        const requestCameraPermission=async()=> {
            console.log("asking permmision");
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera permission granted');
                } else {
                    //console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }

        const getUserFromAppStorage = async()=>{
            try {
                
                const res = await AsyncStorage.getItem('userInfo');
                console.log(res);
                
                if(res!=null){
                    setuser(JSON.parse(res));
                    navigation.navigate('app-home' ,{screen:'categories' ,params:JSON.parse(res)});
                }else{
                    navigation.navigate('auth' ,{screen:'login'});
                }
            } catch (error) {
                console.log(error);
            }
        }
        requestGallaryPermission();
        requestCameraPermission();
        getUserFromAppStorage();
    }, [])
    
  return (
    <Context.Provider value={{user ,setuser ,blogs ,setblogs}}>
    {children}
    </Context.Provider>
  )
}
