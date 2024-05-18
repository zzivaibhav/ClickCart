import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  addToCart,
  decreamentQuantity,
  removeFromCart,
} from '../Redux/CartReducer';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getItemCount } from '../Redux/CartReducer';

const CategoriesLoaded = ({ route, navigation }) => {
  const { name, url } = route.params;
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const load = async () => {
      try {
        const load = await axios.get(`http://10.0.2.2:9000/catLoad/${name}`);
        setItems(load.data);
      } catch (error) {
        Alert.alert('ERROR LOADING', error);
        console.log(error);
      }
    };
    load();
  }, [name]);

  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;

  const truncateDescription = description => {
    if (description.length > 25) {
      return description.substring(0, 25) + '...';
    } else {
      return description;
    }
  };

  const truncateName = description => {
    if (description.length > 11) {
      return description.substring(0, 11) + '...';
    } else {
      return description;
    }
  };

  // Redux part
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const addItemToCart = (id, name, description, salePrice) => {
    const itemToAdd = {
      id: id,
      name: name,
      description: description,
      salePrice: salePrice,
    };

    dispatch(addToCart(itemToAdd));
  };

  const removeItem = itemId => {
    dispatch(decreamentQuantity({ id: itemId }));
  };

  const getItemQuantity = itemId => {
    const item = cart.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', 
      alignItems: 'center', gap: w(5), top: h(1) }}>
        <Image
          source={{ uri: url }}
          style={{ height: h(12), width: h(12) }}
        />
        <Text style={{ fontFamily: 'nourd_bold', fontSize: f(4) }}>{name}</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView style={{ top: h(2) }} showsVerticalScrollIndicator = {false}>
          {items.map((item) => {
            const itemCount = getItemQuantity(item._id);
            return (
              <View key={item._id} style={{ backgroundColor: "#f1f1f1", height: h(29), width: w(95), flex: 1, marginTop: h(2), borderRadius: h(1.5) }}>
                <View style={{ flex: 2, flexDirection: 'row', gap: w(1) }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('product', { id: item._id })}
                    >
                      <Image
                        source={{ uri: item.imageOne }}
                        style={{ height: h(18), width: w(35), borderRadius: 10 }}
                        resizeMode='stretch'
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1.5, justifyContent: 'center', gap: h(2), alignItems: 'center', marginTop: h(2), left: w(1), marginRight: w(1) }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("product", { id: item._id })}
                    >
                      <Text style={{ fontSize: f(3), fontFamily: 'Metropolis-SemiBold' }}>
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: f(1.7) }}>
                        {truncateDescription(item.description)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: w(5) }}>
                  <TouchableOpacity
                    onPress={() => { addItemToCart(item._id, item.name, item.description, item.price) }}
                    style={{ backgroundColor: '#F4D9D9', flex: 0, alignItems: 'center', height: h(7), justifyContent: 'center', width: w(20), borderRadius: h(1) }}
                  >
                    <Text style={{ fontSize: f(3.5) }}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 0, backgroundColor: 'white', alignItems: 'center', height: h(7), justifyContent: 'center', width: w(20), borderRadius: h(1) }}>
                    <Text style={{ fontSize: f(2) }}>{itemCount}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { removeItem(item._id) }}
                    style={{ backgroundColor: '#F4D9D9', flex: 0, height: h(7), alignItems: 'center', justifyContent: 'center', width: w(20), borderRadius: h(1) }}
                  >
                    <Text style={{ fontSize: f(4) }}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CategoriesLoaded;

const styles = StyleSheet.create({});
