import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export default function AboutScreen() {
  return (
    <View style={tw`bg-[#2A2F4F] h-[100%]`}>
      <Text style={tw`p-5 mt-20 text-xl text-white`}>
        This is a  blog app was built using React Native by Chaitnya Giri, a student at
        IIIT Dharwad. This app allows you to create and publish blog posts on a
        variety of topics, from technology to fashion. You can also browse and
        read posts from other users, leave comments, and share your favorite
        posts with friends. The app features a simple and intuitive interface
        that makes it easy to use for both beginners and advanced users. We hope
        you enjoy using our app and look forward to your feedback!
      </Text>
      <Text style={tw`text-gray-200 p-5`}>@all rights reserved</Text>
    </View>
  );
}
