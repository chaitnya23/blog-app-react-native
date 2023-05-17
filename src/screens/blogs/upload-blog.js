import React, { useState ,useContext } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, IconButton, TextInput } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

import tw from 'twrnc';
import LoadingScreen from '../loading-screen';
import { Context } from '../../context/appContext';

export default function UploadBlogScreen() {

    const [title, settitle] = useState(null);
    const [content, setcontent] = useState(null);
    const [category, setcategory] = useState(null);
    const [image, setimage] = useState(null);
    const [imgName, setimgName] = useState(null);
    const [loading, setloading] = useState(false);
    const [imageUrl, setimageUrl] = useState(null);

    const {user} = useContext(Context);

    const openGallary = async () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setimage(response.assets[0].uri);
                setimgName(response.assets[0].fileName);
                // console.log(response.assets[0].fileName);
            }
        });


    };

    const uploadImage = async () => {
        console.log(imgName, 'image');
        setloading({ loading: true, text: 'uploading blog image....' });

        try {
            const reference = storage().ref(imgName);

            await reference.putFile(image);
            const url = await storage().ref(imgName).getDownloadURL();
            console.log(url);
            setimageUrl(url);
            setloading({ ...loading, loading: false });

        } catch (error) {
            console.log(error);
            setloading({ ...loading, loading: false });
        }
    };

    const handleUpload = async () => {

        if (!title || !image || !content) {
            Alert('fill the details correctly...');
            return;
        }

        setloading({ ...loading, loading: true, text: 'uploading your blog....' });

        try {

            //creating document in database
            const _id = uuid.v4();
            firestore().collection('blogs').doc(_id).set({
                _id,
                title,
                content,
                category,
                imageUrl,
                author_userName:user.userName,
                author_profile:user.profilePic,
                timestamp:Date.now()
            }).then((res) => {

                setloading({ ...loading, loading: false });
                setcategory(null);
                setcontent(null);
                settitle(null);
                setimage(null);
            });

        } catch (error) {
            console.log(error);
            setloading({ ...loading, loading: false });

        }
    };

    return (
        <ScrollView>
            {loading.loading && <LoadingScreen text={loading.text} />}

            <View style={tw`h-56 justify-center items-center flex bg-[#2A2F4F]`}>
                <Text style={tw`text-4xl text-white font-bold`}>
                    ' Create your own Blog
                </Text>
            </View>
            <View style={tw`p-2`}>
                {
                    image &&
                    (
                        <View>
                            <Image style={tw`w-full rounded-lg h-72 p-2`} resizeMode='cover' source={{ uri: image }} />
                            <IconButton icon={'check'} iconColor='green' onPress={uploadImage} />
                        </View>
                    )
                }

            </View>

            {
                !image &&
                (<Pressable onPress={openGallary} style={tw`h-44 p-2 bg-gray-300 rounded-xl m-2 flex justify-center items-center`}>
                    <IconButton icon={'image'} size={45} />
                    <Text style={tw`text-lg `}>click here to upload image</Text>
                </Pressable>)
            }


            <View style={tw`bg-white flex gap-5 p-2 m-2`}>
                <TextInput
                    mode="outlined"
                    label="title"
                    value={title}
                    onChangeText={val => settitle(val)}
                />
                <TextInput
                    mode="outlined"
                    label="content"
                    value={content}
                    onChangeText={val => setcontent(val)}
                    multiline
                    numberOfLines={10}
                />

                <Picker
                    style={tw`border-red-300 bg-gray-100`}
                    selectedValue={category}
                    onValueChange={(itemValue) => setcategory(itemValue)}
                >
                    <Picker.Item label="--select a category--" value={0} />

                    <Picker.Item label="Technology" value="Technology" />
                    <Picker.Item label="Entertainment" value="Tntertainment" />
                    <Picker.Item label="Sports" value="Sports" />
                </Picker>
            </View>
            <Button
                onPress={handleUpload}
                mode="contained"
                style={tw`mx-6 mt-4 mb-10`}
                uppercase>
                upload blog
            </Button>
            <View style={tw`h-24`}></View>
        </ScrollView>
    );
}
