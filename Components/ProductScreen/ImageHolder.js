import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Share,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';

const ImageHolder = ({ id }) => {
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductScreen = async () => {
      try {
        const load = await axios.get(
          `http://10.0.2.2:9000/navigateToProduct/${id}`
        );
        setProductDetails(load.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          'ERROR IN LOADING PRODUCT SCREEN IN FRONT END',
          error
        );
        console.log(
          'ERROR IN LOADING PRODUCT SCREEN IN FRONT END ' + error
        );
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

  const renderItem = ({ item, index }) => (
    <Image
      source={{ uri: item }}
      resizeMode="contain"
      style={{
        height: h(50),
        width: w(90),
        borderRadius: w(2),
        marginHorizontal: w(2),
      }}
    />
  );

  const handleScroll = event => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.floor(offset / slideWidth));
  };

  return (
    <View>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#cccccc',
          }}>
          {/* Placeholder Shimmer */}
        </View>
      ) : (
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ alignItems: 'center' }}>
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
              <View style={{ justifyContent: 'center' }}>
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
                      uri:
                        'https://cdn0.iconfinder.com/data/icons/basic-ui-elements-colored/700/08_share-1024.png',
                    }}
                    style={{ height: h(5.5), width: h(5.5) }}
                  />
                </TouchableOpacity>
              </View>
              {/* Product Image Slider */}
              <FlatList
                data={[
                  productDetails.imageOne,
                  productDetails.imageTwo,
                  productDetails.imageThree,
                ]}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()}
              />
              {/* Navigation Dots */}
              <View style={styles.dotContainer}>
                {[0, 1, 2].map(dotIndex => (
                  <View
                    key={dotIndex}
                    style={[
                      styles.dot,
                      currentIndex === dotIndex && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
          <View
            style={{
              borderWidth: w(0.2),
              height: h(0.1),
              borderStyle: 'dashed',
            }}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue', // Change color to blue
    marginHorizontal: 5,
  },
  
  activeDot: {
    backgroundColor: 'black',
  },
});

export default ImageHolder;
