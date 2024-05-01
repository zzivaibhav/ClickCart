import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

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
import {useSelector} from 'react-redux';
const Deals = ({navigation}) => {
  const [deals, setDeals] = useState([]);
  const h = responsiveHeight;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(true);
  const w = responsiveWidth;
  const f = responsiveFontSize;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const deals = await axios.get(
          // 'https://clickcart-t8dh.onrender.com/getDealsSquare',
          'http://10.0.2.2:8000/getDealsSquare',
        );

        setDeals(deals.data);
        if (deals) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  console.log(deals);
  // const cart = useSelector(state => state.cart.cart);
  // console.log(cart);
  return (
    <View>
      {loading ? (
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: f(3),
              marginTop: h(1),
              left: w(0.5),
              fontFamily: 'Metropolis-ExtraBold',
            }}>
            Limited time deals only for you
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: w(8),
              justifyContent: 'center',
              marginTop: h(2),
            }}>
            <ShimmerPlaceholder
              style={{borderRadius: w(2.5), width: w(32), height: h(22)}}
            />
            <ShimmerPlaceholder
              style={{borderRadius: w(2.5), width: w(32), height: h(22)}}
            />
            <ShimmerPlaceholder
              style={{borderRadius: w(2.5), width: w(32), height: h(22)}}
            />
            <ShimmerPlaceholder
              style={{borderRadius: w(2.5), width: w(32), height: h(22)}}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: f(3),
              marginTop: h(1),
              left: w(0.5),
              fontFamily: 'Metropolis-ExtraBold',
            }}>
            Limited time deals only for you
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
              gap: h(5),

              marginTop: h(1),

              width: w(95),
              padding: 5,
            }}>
            {deals.map(item => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('product', {
                    id: item._id,
                  });
                }}>
                <View
                  key={item._id}
                  style={{
                    alignItems: 'center',
                    borderColor: 'grey',
                    borderWidth: w(0.5),
                    padding: h(0.5),
                    borderRadius: w(2.5),
                  }}>
                  <View>
                    <Image
                      src={item.imageOne}
                      style={{
                        height: h(15),
                        width: w(29),
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      fontSize: f(1.8),
                    }}>
                    {item.price} ₹
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#F8f2f0',
                      borderRadius: w(2),
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        backgroundColor: 'red',
                        borderRadius: w(1),

                        color: 'white',
                        marginTop: h(0.5),

                        paddingLeft: w(1.0),
                        fontWeight: 'bold',
                        fontSize: f(2.2),
                      }}>
                      {item.salePrice} ₹
                    </Text>
                    <Text style={{color: 'red'}}>Limited time deal!</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Deals;

const styles = StyleSheet.create({});
