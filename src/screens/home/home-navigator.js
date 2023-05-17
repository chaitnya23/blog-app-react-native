import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import CategoryScreen from './category-screen';
import { Button, Avatar, IconButton } from 'react-native-paper';
import BlogsScreen from '../blogs/blogs-screen';
import tw from 'twrnc';
import UploadBlogScreen from '../blogs/upload-blog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../../context/appContext';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileScreen from './profile-screen';
import AboutScreen from './about-screen';


const Tab = createBottomTabNavigator();

export default function HomeNavigator() {


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          elevation: 0,
          height: 60,
          borderRadius: 10,
          left: 15,
          right: 15
        }
      }
      }>

      <Tab.Screen
        name="blogs"
        component={BlogsScreen}
        options={{
          title: 'blogs',
          headerTitle: 'Categories',
          tabBarLabelStyle: ({ focused }) => ({
            fontSize: 19,
            fontWeight: 'bold',
          }),

          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="post" size={35} color={`${focused ? "#2A2F4F" : "gray"}`} />

          ),
          headerRight: () => <HeaderRight />,
          headerTitleStyle: { color: 'white', fontSize: 18 },
          headerStyle: { backgroundColor: '#2A2F3A' },
        }}
      />

      <Tab.Screen
        name="about"
        component={AboutScreen}
        options={{
          headerTitle: 'About App',
          tabBarLabelStyle: ({ focused }) => ({
            fontSize: 19,
            fontWeight: 'bold',
          }),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="info" size={35} color={`${focused ? "#2A2F4F" : "gray"}`} />

          ),
          headerRight: () => <HeaderRight />,
          headerTitleStyle: { color: 'white', fontSize: 18 },
          headerStyle: { backgroundColor: '#2A2F3A' },
        }}
      />

      <Tab.Screen
        name="add"
        component={UploadBlogScreen}
        options={{
          title: 'Home',
          headerTitle: 'Categories',
          tabBarLabelStyle: ({ focused }) => ({
            fontSize: 19,
            fontWeight: 'bold',
          }),
          tabBarIcon: ({ focused }) => (
            <IconButton mode='elevated' style={tw`p-1 mb-15 bg-purple-400`} icon={'plus'} size={45} />
          ),
          headerRight: () => <HeaderRight />,
          headerTitleStyle: { color: 'white', fontSize: 18 },
          headerStyle: { backgroundColor: '#2A2F3A' },
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoryScreen}
        options={{
          title: 'Home',
          headerTitle: 'Categories',
          tabBarLabelStyle: ({ focused }) => ({
            fontSize: 19,
            fontWeight: 'bold',
          }),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="category" size={35} color={`${focused ? "#2A2F4F" : "gray"}`} />
          ),
          headerRight: () => <HeaderRight />,
          headerTitleStyle: { color: 'white', fontSize: 18 },
          headerStyle: { backgroundColor: '#2A2F3A' },
        }}
      />

      <Tab.Screen
        name="home"
        component={ProfileScreen}
        options={{
          headerTitle: 'My Profile',
          tabBarLabelStyle: ({ focused }) => ({
            fontSize: 19,
            fontWeight: 'bold',
          }),
          tabBarIcon: ({ focused }) => (
            <IconButton icon={'account'} size={35} iconColor={`${focused ? "#2A2F4F" : "gray"}`} />
          ),
          headerRight: () => <HeaderRight />,
          headerTitleStyle: { color: 'white', fontSize: 18 },
          headerStyle: { backgroundColor: '#2A2F3A' },
        }}
      />

    </Tab.Navigator>
  );
}

const HeaderRight = () => {
  const { user } = useContext(Context);
  const navigation = useNavigation();
  // console.log(user);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      navigation.navigate('auth', { screen: 'login' })
    } catch (error) {
      console.log(`Error removing item from storage`, error);
    }
  }

  return (
    <View style={tw`flex-row items-center gap-1`}>
      <Avatar.Image source={{ uri: user && user.profilePic }} size={40} />
      <IconButton icon={'logout'} iconColor='white' onPress={logout} style={tw`z-100`} />
    </View>
  );
};
