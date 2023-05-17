import React, { useContext, useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Pressable, RefreshControl, Dimensions } from 'react-native'
import { Avatar } from 'react-native-paper'
import tw from 'twrnc'
import { Context } from '../../context/appContext'
import firestore from '@react-native-firebase/firestore';

const { height } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {

  const { user } = useContext(Context);
  const [userBlogs, setuserBlogs] = useState([]);

  const converToDate = ts => {
    const date = new Date(ts);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  // on refresh
  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);

    }, 3000);
  };

  useEffect(() => {

    const getUserBlogs = async () => {

      try {
        firestore().collection('blogs').where('author_userName', "==", user.userName)
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
                // console.log(date);
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
              setuserBlogs(list);
              // category=null;
            },
            error => {
              console.log('Error getting data: ', error);
            },
          );


      } catch (error) {
        console.log(error);
      }
    }
    getUserBlogs();
  }, [])
  console.log(userBlogs);


  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={tw`h-[${height}px] flex justify-center items-center bg-[#2A2F4F]`}>
        <View style={tw` w-[90%] h-[60%] flex items-center p-2 bg-white shadow rounded-lg relative`}>
          <Avatar.Image size={100} source={{ uri: user && user.profilePic }} style={tw`-top-12`} />
          <Text style={tw`font-bold text-black text-xl`}>{user.userName}</Text>
          <Text style={tw` my-4 text-black text-xl`}>{user.email}</Text>
          <Text style={tw` my-4 text-black font-bold text-xl`}>My Blogs :</Text>
          <View style={{height:200 }}>
          <ScrollView  nestedScrollEnabled>
          {
              userBlogs.map((blog, idx) => {
                return (
                  <Pressable onPress={() => navigation.navigate('blog', { ...blog })} key={idx}>
                    <View style={tw`p-2 border bg-[#282A3A] rounded-lg my-3 flex-row justify-center items-center gap-3 `}>
                      <Image source={{ uri: blog.imageUrl }} style={{ height: 50, width: 50 }} resizeMode='cover' />
                      <Text style={tw`w-[80%] font-semibold text-white`}>{blog.title}</Text>
                    </View>
                    
                  </Pressable>
                  )
                })
              }
              </ScrollView>
              </View>
        </View>
      </View>
    </ScrollView>
  )
}
