import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Image from '../Components/ProductScreen/ImageHolder';
import DescriptionHolder from '../Components/ProductScreen/DescriptionHolder';

const ProductScreen = ({route}) => {
  const {id} = route.params;
  return (
    <ScrollView style={{flex: 1}}>
      <Image id={id} />
      <DescriptionHolder id={id} />
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
