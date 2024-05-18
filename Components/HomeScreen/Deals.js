import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, Text as RNText } from 'react-native';
import axios from 'axios';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Card, Title, Paragraph, Text } from 'react-native-paper';

const Deals = ({ navigation }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:9000/getDealsSquare');
        setDeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDeals();
  }, []);

  const renderDealItem = (item) => (
    <TouchableOpacity
      key={item._id}
      onPress={() => navigation.navigate('product', { id: item._id })}
      style={styles.cardContainer}
    >
      <ImageBackground
        source={{ uri: item.imageOne }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.linearGradient}
        >
          <View style={styles.detailsContainer}>
            <Title style={styles.salePrice}>{item.salePrice} ₹</Title>
            <Paragraph style={styles.price}>
              <RNText style={styles.originalPrice}>{item.price} ₹</RNText>
            </Paragraph>
            <Text style={styles.dealText}>Limited time deal!</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Limited Time Deals</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          {[...Array(4)].map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              LinearGradient={LinearGradient}
              style={styles.shimmerPlaceholder}
            />
          ))}
        </View>
      ) : (
        <View style={styles.dealsContainer}>
          {deals.map(renderDealItem)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  shimmerPlaceholder: {
    borderRadius: responsiveWidth(2.5),
    width: responsiveWidth(42),
    height: responsiveHeight(22),
    marginVertical: responsiveHeight(2),
    marginRight: responsiveWidth(2),
  },
  dealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%', // Two cards per row with a small gap
    marginBottom: responsiveHeight(2),
  },
  backgroundImage: {
    width: '100%',
    height: responsiveHeight(30), // Increase image height
    borderRadius: responsiveWidth(2.5),
    overflow: 'hidden',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: responsiveWidth(4),
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: responsiveWidth(2.5),
    padding: responsiveWidth(3),
  },
  salePrice: {
    color: 'white',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
    fontFamily: 'Roboto-Bold',
  },
  price: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Roboto-Regular',
  },
  originalPrice: {
    textDecorationLine: 'line-through', // Add strike-through effect
  },
  dealText: {
    color: 'red',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Roboto-Bold',
  },
});

export default Deals;
