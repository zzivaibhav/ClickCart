import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../Redux/CartReducer';

const DescriptionHolder = ({id}) => {
  const h = responsiveHeight;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(true);
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [productDetails, setProductDetails] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductScreen = async () => {
      try {
        const load = await axios.get(
          `http://10.0.2.2:8000/navigateToProduct/${id}`,
        );
        setProductDetails(load.data);
        console.log(productDetails);
        setLoading(false);
      } catch (error) {
        Alert.alert('ERROR IN LOADING PRODUCT SCREEN IN FRONT END', error);
        console.log('ERROR IN LOADING PRODUCT SCREEN IN FRONT END ' + error);
      }
    };
    fetchProductScreen();
  }, []);

  const dispatch = useDispatch();

  const addItemToCart = () => {
    const itemToAdd = {
      id: productDetails._id,
      name: productDetails.name,
      description: productDetails.description,
      salePrice: productDetails.salePrice,
    };
    dispatch(addToCart(itemToAdd));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };

  const cart = useSelector(state => state.cart.cart);
  console.log(cart);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, backgroundColor: '#cccccc'}}>
          <View
            style={{
              width: w(95),
              alignItems: 'center',
              marginLeft: w(2.5),
            }}>
            <ShimmerPlaceholder
              style={{
                height: h(20),
                width: w(95),
                marginTop: h(1),
                borderRadius: w(5),
              }}
            />
          </View>
          <View style={{alignItems: 'center', width: w(100)}}>
            <View style={{marginTop: h(2)}}>
              <ShimmerPlaceholder
                style={{
                  height: h(7),
                  borderRadius: w(5),
                  width: w(95),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: h(1.5),
                width: w(70),
              }}>
              <ShimmerPlaceholder
                style={{
                  width: w(25),
                  height: h(5),
                  borderRadius: w(6),
                }}
              />
              <ShimmerPlaceholder
                style={{
                  width: w(25),
                  height: h(5),
                  borderRadius: w(6),
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              backgroundColor: '#fff',
              width: w(95),
              alignItems: 'center',
              marginLeft: w(2.5),
              flexDirection: 'row',
              justifyContent: 'space-between',
              top: h(1.5),
            }}>
            <Text
              style={{
                fontSize: f(2.8),
                fontFamily: 'Metropolis-Regular',
              }}>
              {productDetails.name}
            </Text>

            <Text
              style={{
                fontSize: f(3.0),
                fontFamily: 'nourd_heavy',
              }}>
              {productDetails.salePrice} ₹
            </Text>
          </View>
          <View style={{alignItems: 'center', flex: 1}}>
            <View
              style={{
                top: h(3.5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: w(75),
              }}>
              <TouchableOpacity onPress={addItemToCart}>
                <View
                  style={{
                    backgroundColor: '#000',
                    height: h(6),
                    width: w(26),
                    borderRadius: w(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: w(2),
                  }}>
                  {addedToCart ? (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: f(1.8),
                        fontFamily: 'nourd_regular',
                      }}>
                      Added to Cart ✔️
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: f(1.9),
                        fontFamily: 'nourd_regular',
                      }}>
                      Add to cart
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#000',
                  height: h(6),
                  width: w(26),
                  borderRadius: w(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: f(1.9),
                    fontFamily: 'nourd_regular',
                  }}>
                  Buy Now
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: h(4)}}>
            <Text>Deliver to :</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DescriptionHolder;
