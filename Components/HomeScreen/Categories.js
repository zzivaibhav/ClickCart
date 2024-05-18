import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import axios from 'axios';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Categories = ({navigation}) => {
  const h = responsiveHeight;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(true);
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:9000/getCategory");
 
         setCategories(response.data);
        if (categories) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <View>
      {loading ? (
        <View
          style={{
            height: h(8),
            justifyContent: 'center',
            marginTop: h(0.5),
            alignItems: 'center',
            flexDirection: 'row',
            gap: w(5),
          }}>
          <ShimmerPlaceholder
            style={{
              width: w(20),
              height: h(7),
              backgroundColor: '#b8bfba',
              borderRadius: h(1),
            }}></ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{
              width: w(20),
              height: h(7),
              backgroundColor: '#b8bfba',
              borderRadius: h(1),
            }}></ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{
              width: w(20),
              height: h(7),
              backgroundColor: '#b8bfba',
              borderRadius: h(1),
            }}></ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{
              width: w(20),
              height: h(7),
              backgroundColor: '#b8bfba',
              borderRadius: h(1),
            }}></ShimmerPlaceholder>
        </View>
      ) : (
        <ScrollView
          horizontal
          style={{flexDirection: 'row', marginTop: h(1)}}
          showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <View key={category._id} style={{marginHorizontal: w(5)}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('catLoaded', {
                    name: category.name,
                    url: category.url,
                  });
                }}>
                <Image
                  source={{uri: category.url}}
                  style={{height: h(5), width: h(5)}}
                />
                <Text
                  style={{
                    fontFamily: 'Metropolis-ExtraBold',
                    fontSize: h(1.9),
                  }}>
                  {category.name}
                </Text> 
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
