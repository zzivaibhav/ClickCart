import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Header = () => {
  const h = responsiveFontSize;
  const w = responsiveWidth;
  const f = responsiveFontSize;

  return (
    <View>
      <View
        style={{
          backgroundColor: '#481E14',
          alignItems: 'center',
          borderRadius: h(4),
          width: w(95),
          zIndex: 1,
          marginLeft: w(2.5),
          //marginBottom: h(1.5),
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Metropolis-SemiBold',
              fontSize: f(5),
              color: '#fff',
            }}>
            CATEGORIES
          </Text>
        </View>
      </View>
      <View
        style={{
          width: w(100),
          marginTop: h(1.1),
          marginBottom: h(1.1),
          backgroundColor: '#35374B',
          height: h(0.5),
        }}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
