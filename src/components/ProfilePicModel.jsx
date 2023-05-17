import React, { useState } from 'react'
import { View } from 'react-native'
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
// import {PermissionsAndroid} from 'react-native-permissions';
import {launchCamera  ,launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import tw from 'twrnc'
import FastImage from 'react-native-fast-image';

export default function ProfilePicModel({ visible, cancel ,uploadImage ,setprofilePic ,profilePic ,setimgName }) {
    // const containerStyle = {backgroundColor: 'white', padding: 20 ,position:'absolute'};
    const [permissionGranted, setpermissionGranted] = useState(false);

    // async function requestCameraPermission() {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: 'Camera Permission',
    //                 message: 'This app needs access to your camera.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             //console.log('Camera permission granted');
    //         } else {
    //             //console.log('Camera permission denied');
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }

   

    // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    // Call the requestPermission function
    // requestGallaryPermission();
    // requestCameraPermission();


    const openCamera = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        }

        launchCamera(options,
            (response) => {
                console.log(response);
                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    // setImage({uri:'data:image/jpeg;base64.'+response.base64});
                    // console.log("image" ,Image);
                    // console.log(response.assets[0].uri);
                    setprofilePic(response.assets[0].uri);
                    setimgName(response.assets[0].fileName);
                }
            },
        );
    }


    const openGallary = () => {
        const options = {
            
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        }

        launchImageLibrary(options,
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    setprofilePic(response.assets[0].uri);
                    setimgName(response.assets[0].fileName);

                }
            },
        );
    }
    return (

        <Portal >
            <Modal visible={visible} onDismiss={()=>{
                cancel();
            }} style={tw`flex justify-center items-center `} contentContainerStyle={{ padding: 10, borderRadius: 5, width: '95%', margin: 'auto', backgroundColor: "white" }}>
                <View>
                    <View style={tw`border-2 rounded-full mx-auto mb-8 w-24 h-24 overflow-hidden`}>
                    <FastImage source={{uri:profilePic}} resizeMode='cover' style={{ width: '100%', height: "100%" }}/>
                    </View>
                    <View style={tw` flex-row gap-2 mb-8`}>
                        <Button icon='camera' mode='text' onPress={openCamera}>Open camera</Button>
                        <Button icon='image' mode='text' onPress={openGallary}>Select from gallary</Button>
                    </View>
                    <Button mode='contained' onPress={async()=>{
                        cancel();
                        await uploadImage();
                    }}  >Confirm</Button>
                </View>
            </Modal>
        </Portal>

    )
}
