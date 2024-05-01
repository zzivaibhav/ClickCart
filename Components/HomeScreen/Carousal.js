import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Carousal = () => {
  const [carousals, setCarousal] = useState([]);
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const carousal = await axios.get(
          // 'https://clickcart-t8dh.onrender.com/getCarousal',
          'http://10.0.2.2:8000/getCarousal',
        );

        setCarousal(carousal.data);
        if (carousal) {
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
        <View style={{alignItems: 'center', marginVertical: h(1)}}>
          <ShimmerPlaceholder
            style={{
              height: h(25),
              width: w(95),
              borderRadius: w(5),
              backgroundColor: '#b8bfba',
            }}
          />
        </View>
      ) : (
        <View>
          <SliderBox
            images={carousals.map(carousal => carousal.url)}
            sliderBoxHeight={200}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: 'absolute',

              paddingVertical: 10,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: 'rgba(128, 128, 128, 0.92)',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Carousal;

const styles = StyleSheet.create({});
