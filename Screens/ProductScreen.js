import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Share, FlatList } from 'react-native';
import axios from 'axios';
import {
  responsiveHeight as h,
  responsiveWidth as w,
  responsiveFontSize as f,
} from 'react-native-responsive-dimensions';
import { Appbar, Button, Card, ActivityIndicator, Paragraph, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/CartReducer';

const ProductScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductScreen = async () => {
      try {
        const load = await axios.get(`http://10.0.2.2:9000/navigateToProduct/${id}`);
        setProductDetails(load.data);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to load product details');
        console.error(error);
      }
    };
    fetchProductScreen();
  }, [id]);

  const shareData = async () => {
    try {
      await Share.share({
        message: `Hey! Check out this brand new ${productDetails.name}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const dispatch = useDispatch();
  const addItemToCart = () => {
    const itemToAdd = {
      id: productDetails._id,
      name: productDetails.name,
      description: productDetails.description,
      salePrice: productDetails.salePrice,
    };
    dispatch(addToCart(itemToAdd));
    Alert.alert('Success', 'Item added to cart');
  };

  const cart = useSelector(state => state.cart.cart);
  console.log(cart);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const handleScroll = event => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.floor(offset / slideWidth));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Details" />
        <Appbar.Action icon="share" onPress={shareData} />
      </Appbar.Header>

      <FlatList
        data={[productDetails.imageOne, productDetails.imageTwo, productDetails.imageThree]}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item, index) => index.toString()}
        style={styles.carousel}
      />

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

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.name}>{productDetails.name}</Text>
          <Paragraph style={styles.description}>{productDetails.description}</Paragraph>
          <Text style={styles.price}>{productDetails.salePrice} ₹</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonsContainer}>
        <Button mode="contained" onPress={addItemToCart} style={styles.button}>
          Add to Cart
        </Button>
        <Button mode="contained" onPress={() => Alert.alert('Buy Now')} style={styles.button}>
          Buy Now
        </Button>
      </View>

      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Deliver to:</Text>
        {/* Delivery Address Component or Placeholder */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    marginVertical: h(2),
  },
  image: {
    height: h(50),
    width: w(90),
    borderRadius: w(2),
    marginHorizontal: w(2),
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: h(2),
  },
  dot: {
    width: w(2.5),
    height: w(2.5),
    borderRadius: w(1.25),
    backgroundColor: 'gray',
    marginHorizontal: w(1.25),
  },
  activeDot: {
    backgroundColor: 'black',
  },
  card: {
    marginHorizontal: w(5),
    marginVertical: h(2),
  },
  name: {
    fontSize: f(3),
    fontFamily: 'Roboto-Medium',
    marginBottom: h(1),
  },
  description: {
    fontSize: f(2.2),
    fontFamily: 'Roboto-Regular',
    marginVertical: h(1),
  },
  price: {
    fontSize: f(3),
    fontFamily: 'Roboto-Bold',
    color: '#e91e63',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: h(2),
  },
  button: {
    width: w(40),
    height: h(6),
    justifyContent: 'center',
  },
  deliveryContainer: {
    marginHorizontal: w(5),
    marginTop: h(2),
  },
  deliveryText: {
    fontSize: f(2),
    fontFamily: 'Roboto-Regular',
  },
});

export default ProductScreen;
