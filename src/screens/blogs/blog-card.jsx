import React from 'react'
import { View, Pressable } from 'react-native';
import { Card, Button, IconButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import tw from 'twrnc'

export default function BlogCard({ title, imageUrl ,content ,author_userName ,author_profile ,date}) {

    const navigation = useNavigation();
    
    return (
        <Pressable onPress={()=>navigation.navigate('blog' ,{title ,imageUrl ,date ,content ,author_userName ,author_profile })} >
            <Card mode='elevated' elevation={5} style={tw`bg-[#282A3A] my-3 w-[97%] mx-auto p-1`}>
                <Card.Cover style={tw`w-[98%] mx-auto`} source={{ uri: imageUrl && imageUrl }} />
                <Card.Content>
                    <Text style={tw`font-bold my-1 text-white`} variant="headlineSmall">{title && title}</Text>
                    <Text variant='bodySmall' style={tw`text-gray-300`}>{date}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode='text' contentStyle={{ flexDirection: 'row-reverse' }} icon={'arrow-right'} textColor='#917FB3' style={tw`font-black`}>Read more</Button>
                </Card.Actions>
            </Card>
        </Pressable>
    )
}
