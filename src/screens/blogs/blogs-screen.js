import React, {useState, useEffect ,useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import BlogCard from './blog-card';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

import tw from 'twrnc';
import { Context } from '../../context/appContext';


export default function BlogsScreen() {

  // const [blogs, setblogs] = useState([]);
  const {blogs ,setblogs} = useContext(Context);
  const [filter, setfilter] = useState([]);

  const route = useRoute();

  const converToDate = ts => {
    const date = new Date(ts); 
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
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
    const getData = async () => {
      try {
        firestore()
          .collection('blogs')
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
                console.log(date);
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
              // category=null;
            },
            error => {
              console.log('Error getting data: ', error);
            },
            );
            // selectedCategory(null);
        // console.log(res._docs[0]._data);
      } catch (error) {
        console.log(error);
      }
    };

     getData();
    // else getCategorySpecificBlogs();
  

  }, [refreshing]);

  
  return (
    <View style={tw`bg-[#2A2F4F] h-[100%] relative`}>
   
      <FlatList
        data={blogs}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <BlogCard key={item._id} {...item} />}
        keyExtractor={item => item._id}
      />
      <View style={tw`h-28`}></View>
    </View>
  );
}
