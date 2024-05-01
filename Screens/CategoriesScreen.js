import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../Components/CategoriesScreen/Header';
import Grid from '../Components/CategoriesScreen/Grid';
const CategoriesScreen = ({navigation}) => {
  const h = responsiveFontSize;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff', marginTop: 5}}>
      <Header />

      <Grid navigation={navigation} />
    </ScrollView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
