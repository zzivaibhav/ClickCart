import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import axios from 'axios';
const Grid = ({navigation}) => {
  const h = responsiveFontSize;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/getCategory');
        setCategories(response.data);
        console.log(response);
        if (categories) {
          setLoading(false);
        }
      } catch (e) {
        console.log('error fetching categories: ' + e);
      }
    };
    loadCategories();
  }, []);
  return (
    <View>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: w(100),
            height: h(100),
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#cccccc',
            gap: h(5.5),
            paddingTop: h(5),
            paddingBottom: h(2.5),
          }}>
          <ShimmerPlaceholder
            style={{width: w(37), height: w(37), borderRadius: w(37)}}
          />
          <ShimmerPlaceholder
            style={{width: w(37), height: w(37), borderRadius: w(37)}}
          />
          <ShimmerPlaceholder
            style={{width: w(37), height: w(37), borderRadius: w(37)}}
          />
          <ShimmerPlaceholder
            style={{width: w(37), height: w(37), borderRadius: w(37)}}
          />
          <ShimmerPlaceholder
            style={{width: w(37), height: w(37), borderRadius: w(37)}}
          />
        </View>
      ) : (
        <View
          horizontal
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: h(5.5),
            backgroundColor: '#9B3922',
            paddingTop: h(5),
            paddingBottom: h(2.5),
          }}>
          {categories.map(category => (
            <View>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => {
                  navigation.navigate('catLoaded', {
                    name: category.name,
                    url: category.url,
                  });
                }}>
                <View
                  key={category._id}
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    width: w(37),
                    height: w(37),
                    borderRadius: w(37),
                    borderWidth: h(0.7),
                    borderColor: '#481E14',
                  }}>
                  <Image
                    source={{uri: category.url}}
                    style={{height: h(14), width: h(14)}}
                    resizeMode="contain"
                  />
                  <Text>{category.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({});
