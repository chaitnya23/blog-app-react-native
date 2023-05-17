import React, {useState} from 'react';
import {View, Text, FlatList ,Dimensions} from 'react-native';
import CategoryCard from '../../components/category-card';
import tw from 'twrnc';
import categories from '../../data/category-data'

const data = [1, 1, 1, 1, 1];
const {width} = Dimensions.get('window');

export default function CategoryScreen() {
  const [crntIdx, setcrntIdx] = useState(0);
  // console.warn(categories)
  return (
    <View style={tw`h-[100%] bg-white bg-[#2A2F4F]`}>
      <View style={tw`my-auto`}>
      
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item ,idx)=> idx}
          pagingEnabled
          data={categories}
          renderItem={({item}) => <CategoryCard {...item}/>}
          onScroll={(e)=>{
            const x = e.nativeEvent.contentOffset.x;
            setcrntIdx((x/width).toFixed(0));
          }}
        />
        <View style={tw`mt-7 flex flex-row justify-center gap-4`}>
          {categories.map((ele, idx) => {
            return <View key={idx} style={tw`w-${idx==crntIdx?12:2} h-2 rounded-full bg-gray-300 `}></View>;
          })}
        </View>
      </View>
    </View>
  );
}
