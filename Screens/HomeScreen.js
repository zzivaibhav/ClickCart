import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import Mic from 'react-native-vector-icons/Feather';
import Location from 'react-native-vector-icons/EvilIcons';
import DownArrow from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SearchBar from '../Components/HomeScreen/SearchBar';
import Locations from '../Components/HomeScreen/Locations';
import Categories from '../Components/HomeScreen/Categories';
import Carousal from '../Components/HomeScreen/Carousal';
import Squares from '../Components/HomeScreen/Squares';
import Deals from '../Components/HomeScreen/Deals';

const HomeScreen = ({navigation}) => {
  const [deals, setDeals] = useState([]);
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const deals = await axios.get('http://10.0.2.2:8000/getDealsSquare');

        setDeals(deals.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  console.log(deals);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? h(1) : 0,
      }}>
      <ScrollView>
        <SearchBar />
        <Locations />
        <Categories navigation={navigation} />
        <Carousal />
        <Squares navigation={navigation} />
        <Deals navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
