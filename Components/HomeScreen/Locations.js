import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Location from 'react-native-vector-icons/EvilIcons';
import DownArrow from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const Locations = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const h = responsiveHeight;
  const w = responsiveWidth;
  const [loading, setLoading] = useState(true);
  const f = responsiveFontSize;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  return (
    <>
      <View>
        {loading ? (
          <View>
            <ShimmerPlaceholder
              style={{
                backgroundColor: '#b8bfba',
                height: h(5.5),
                width: w(100),
                marginTop: h(0.5),
              }}></ShimmerPlaceholder>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#C197D2',
              flexDirection: 'row',
              gap: w(2),
              alignItems: 'center',
              padding: h(1.7),
            }}>
            <Location name="location" size={f(3.5)} color="#000" />
            <TouchableOpacity>
              <Text style={{fontSize: f(1.5), fontWeight: '500'}}>
                Deliver to Vaibhav - Vadodara 390002
              </Text>
            </TouchableOpacity>
            <DownArrow name="keyboard-arrow-down" size={f(1.5)} color="#000" />
          </View>
        )}
      </View>
    </>
  );
};

export default Locations;

const styles = StyleSheet.create({});
