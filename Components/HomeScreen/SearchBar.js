import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Mic from 'react-native-vector-icons/Feather';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const SearchBar = () => {
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [loading, setLoading] = useState(true);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  return (
    <View>
      {loading ? (
        <View style={{alignItems: 'center'}}>
          <ShimmerPlaceholder
            style={{
              backgroundColor: '#b8bfba',
              height: h(6.0),

              width: w(98),
              borderRadius: h(1),
              marginHorizontal: w(5),
            }}></ShimmerPlaceholder>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#613659',
            padding: h(1),
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              marginHorizontal: w(3),
              backgroundColor: '#d1e3ac',
              borderRadius: 6,
              elevation: 5,
            }}>
            <Icon
              name="search1"
              size={f(2.5)}
              style={{
                flex: 1,
                paddingLeft: w(3),
              }}
              color="#000"
            />
            <TextInput
              placeholder="Search Item"
              style={{flex: 8, fontSize: f(2)}}
            />
          </TouchableOpacity>
          <View>
            <Mic name="mic" size={f(2.6)} color="#fff" />
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
