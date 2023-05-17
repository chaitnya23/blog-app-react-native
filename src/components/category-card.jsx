import React,{useContext} from 'react'
import { View, Text, Image, Dimensions ,Pressable } from 'react-native'
import FastImage from 'react-native-fast-image';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { Context } from '../context/appContext';
import firestore from '@react-native-firebase/firestore';

const { height, width } = Dimensions.get('window');

export default function CategoryCard({ img, category }) {

    const navigation = useNavigation();
    const {blogs ,setblogs} = useContext(Context);


    const converToDate = ts => {
        const date = new Date(ts); 
        const options = {day: '2-digit', month: 'short', year: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
      };

      //function to get blogs data according to selected category
  const getCategorySpecificBlogs = async()=>{
    try {
      firestore()
        .collection('blogs')
        .where('category' ,"==" ,category)
        .orderBy('timestamp', 'desc')
        .get()
        .then(
          res => {
            const list = [];
            res._docs.forEach(doc => {
              //  console.log(doc);
              const {
                title,
                content,
                category,
                imageUrl,
                _id,
                author_userName,
                author_profile,
                timestamp,
              } = doc._data;

              const date = converToDate(timestamp);
            //   console.log(date);
              list.push({
                title,
                content,
                category,
                imageUrl,
                _id,
                author_userName,
                author_profile,
                date,
              });
            });
            setblogs(list);
            navigation.navigate('blogs' ,{category});
          },
          error => {
            console.log('Error getting data: ', error);
          },
        );
      // console.log(res._docs[0]._data);
    } catch (error) {
      console.log(error);
    };
  }

    return (
        <Pressable onPress={getCategorySpecificBlogs}>
            <View style={tw`h-[${height / 7}] rounded-xl relative shadow-xl  w-[${width / 4 - 10}] m-2 bg-blue-400 `}>
                <FastImage source={img} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 10 }} />

                <View style={tw`absolute z-50 bottom-4 right-1 p-3 opacity-70 shadow-xl bg-black w-[80%]`}>
                    <Text style={tw`text-white font-semibold text-3xl  `}>{category}</Text>
                </View>
            </View>
        </Pressable>
    )
}
