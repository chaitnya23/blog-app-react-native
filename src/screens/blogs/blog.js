import React ,{useState ,useEffect} from 'react'
import { ScrollView, View, Text, Image, Dimensions, ImageBackground ,RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc'

const { height } = Dimensions.get('window');
export default function Blog({ navigation }) {

    const route = useRoute();
    
    const [refreshing, setrefreshing] = useState(false);
    const onRefresh = ()=>{
        setrefreshing(true);
    }
    const { title, imageUrl, content, author_userName, author_profile, date } = route.params;
    // console.log(route.params);

    return (
        <ScrollView style={tw`bg-[#2A2F4F]`} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View style={tw`flex-row mb-1 bg-white rounded mt-1 p-1 mx-2 gap-2 bg-[#2A2F4F] justify-start items-center `}>
                <IconButton icon={'chevron-left'} onPress={() => navigation.goBack()} iconColor='white' size={30} />
                <Avatar.Image size={40} source={{ uri: author_profile }} />
                <View>
                    <Text style={tw`font-semibold text-white`}>{author_userName}</Text>
                    <Text style={tw`text-gray-400`}>author</Text>
                </View>
            </View>
            <View style={tw`relative`}>
                <ImageBackground style={tw`h-[${height / 10}] rounded relative top-0 bottom-30 right-0 left-0 `} resizeMode='cover' source={{ uri: imageUrl }} />
            </View>

            <View style={tw`flex-row justify-between p-2 m-1 `}>
                <Text style={tw`font-semibold text-white text-[4] mb-4`}>{date}</Text>
            </View>

            <View style={tw`p-3 mx-2 bg-white rounded bg-[#282A3A] `}>
                <Text style={tw`font-bold text-3xl text-white p-2`}>{title}</Text>
                <Text style={tw` text-white text-[4.5] p-2`}>
                    {content}
                </Text>
            </View>

        </ScrollView>
    )
}
