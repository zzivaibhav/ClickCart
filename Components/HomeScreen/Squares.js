import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const Squares = ({navigation}) => {
  const [square, setSquare] = useState([]);
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const square = await axios.get(
          'http://10.0.2.2:8000/getProductSliderOne',
          // 'https://clickcart-t8dh.onrender.com/getProductSliderOne',
        );

        setSquare(square.data);

        if (square) {
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: h(1),
            flexDirection: 'row',
          }}>
          <ShimmerPlaceholder
            style={{
              height: h(16),
              width: w(25),
              marginHorizontal: w(2),
              borderRadius: h(2),
            }}
          />
          <ShimmerPlaceholder
            style={{
              height: h(16),
              width: w(25),
              marginHorizontal: w(2),
              borderRadius: h(2),
            }}
          />
          <ShimmerPlaceholder
            style={{
              height: h(16),
              width: w(25),
              marginHorizontal: w(2),
              borderRadius: h(2),
            }}
          />
          <ShimmerPlaceholder
            style={{
              height: h(16),
              width: w(25),
              marginHorizontal: w(2),
              borderRadius: h(2),
            }}
          />
          <ShimmerPlaceholder
            style={{
              height: h(16),
              width: w(25),
              marginHorizontal: w(2),
              borderRadius: h(2),
            }}
          />
        </ScrollView>
      ) : (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              backgroundColor: '#F8f2f0',
              paddingTop: h(0.5),
              marginTop: h(1),
              paddingBottom: h(1),
            }}>
            {square.map(item => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('product', {
                    id: item._id,
                  });
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    gap: 2,
                    marginHorizontal: w(3),
                    borderColor: 'grey',
                    borderWidth: h(0.2),
                    borderRadius: w(1.5),
                  }}
                  key={item._id}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: f(1.8),
                      fontFamily: 'Metropolis-SemiBold',
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    src={item.imageOne}
                    style={{height: h(10), width: w(33)}}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Squares;

const styles = StyleSheet.create({});
