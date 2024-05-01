import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Share,
  TouchableOpacity,
} from 'react-native';
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
import {SafeAreaView} from 'react-native-safe-area-context';

const ImageHolder = ({id}) => {
  const h = responsiveHeight;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [loading, setLoading] = useState(true);
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductScreen = async () => {
      try {
        const load = await axios.get(
          `http://10.0.2.2:8000/navigateToProduct/${id}`,
        );
        setProductDetails(load.data);
        setLoading(false);
      } catch (error) {
        Alert.alert('ERROR IN LOADING PRODUCT SCREEN IN FRONT END', error);
        console.log('ERROR IN LOADING PRODUCT SCREEN IN FRONT END ' + error);
      }
    };
    fetchProductScreen();
  }, []);

  const shareData = async () => {
    try {
      await Share.share({
        message: `Hey !! Get this brand new ${productDetails.name}`,
      });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  return (
    <View>
      {loading ? (
        <View style={{alignItems: 'center', backgroundColor: '#cccccc'}}>
          {/* Placeholder Shimmer */}
        </View>
      ) : (
        <View style={{backgroundColor: 'white'}}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: w(95),
                borderRadius: w(3),
                borderWidth: w(0.5),
                justifyContent: 'space-between',
                marginTop: h(2),
                borderColor: '#5C5050',
                padding: w(2),
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'nourd_medium',
                    fontSize: f(3),
                  }}>
                  {productDetails.description}
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginTop: h(1.5),
                }}>
                <TouchableOpacity onPress={shareData}>
                  <Image
                    source={{
                      uri: 'https://cdn0.iconfinder.com/data/icons/basic-ui-elements-colored/700/08_share-1024.png',
                    }}
                    style={{height: h(5.5), width: h(5.5)}}
                  />
                </TouchableOpacity>
              </View>
              {/* Product Image */}
              <Image
                source={{uri: productDetails.imageOne}}
                resizeMode="contain"
                style={{height: h(50), width: w(90)}}
              />
            </View>
          </View>
          <View
            style={{borderWidth: w(0.2), height: h(0.1), borderStyle: 'dashed'}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageHolder;
