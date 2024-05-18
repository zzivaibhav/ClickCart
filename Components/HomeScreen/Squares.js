import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import axios from 'axios';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { TouchableRipple } from 'react-native-paper';
import ShimmerPlaceholder, { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const Squares = ({ navigation }) => {
  const [square, setSquare] = useState([]);
  const [loading, setLoading] = useState(true);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const squareData = await axios.get('http://10.0.2.2:9000/getProductSliderOne');
        setSquare(squareData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const renderSquareItem = (item, index) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    });
    return (
      <TouchableRipple
        key={item._id}
        onPress={() => navigation.navigate('product', { id: item._id })}
        style={styles.cardContainer}
      >
        <Animated.View style={[styles.itemContainer, { transform: [{ translateY }] }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image source={{ uri: item.imageOne }} style={styles.itemImage} />
        </Animated.View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.loadingContainer}
        >
          {[...Array(5)].map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              style={styles.shimmerPlaceholder}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.squareContainer}
        >
          {square.map(renderSquareItem)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(1),
  },
  loadingContainer: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
  },
  shimmerPlaceholder: {
    borderRadius: responsiveWidth(10),
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    marginHorizontal: responsiveWidth(2),
  },
  squareContainer: {
    paddingTop: responsiveHeight(0.5),
    marginTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(1),
  },
  cardContainer: {
    marginHorizontal: responsiveWidth(2),
  },
  itemContainer: {
    alignItems: 'center',
    borderRadius: responsiveWidth(1),
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 4,
    padding: responsiveWidth(2),
  },
  itemName: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Roboto-Medium',
    marginTop: responsiveHeight(1),
  },
  itemImage: {
    height: responsiveHeight(12),
    width: responsiveWidth(33),
    resizeMode: 'cover',
  },
});

export default Squares;
