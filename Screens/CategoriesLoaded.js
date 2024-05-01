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
  getItemCount,
  removeFromCart,
} from '../Redux/CartReducer';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Dash from 'react-native-dash';
import {useSelector, useDispatch} from 'react-redux';

const CategoriesLoaded = ({route, navigation}) => {
  const {name, url} = route.params;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const load = await axios.get(`http://10.0.2.2:8000/catLoad/${name}`);
        setItems(load.data);
      } catch (error) {
        Alert.alert('ERROR LOADING', error);
        console.log(error);
      }
    };
    load();
  }, []);
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

  //redux part
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const addItemToCart = (itemDescription, itemId, itemName, itemSalePrice) => {
    const itemToAdd = {
      id: itemId,
      description: itemDescription,
      name: itemName,
      salePrice: itemSalePrice,
    };
    console.log(itemToAdd.id);
    dispatch(addToCart(itemToAdd));
    // setAddedToCart(true);
    // setTimeout(() => {
    //   setAddedToCart(false);
    // }, 6000);
  };

  const decreamentItemfromCart = (
    itemDescription,
    itemId,
    itemName,
    itemSalePrice,
  ) => {
    const itemToRemove = {
      id: itemId,
      description: itemDescription,
      name: itemName,
      salePrice: itemSalePrice,
    };

    dispatch(decreamentQuantity(itemToRemove));
    // setAddedToCart(true);
    // setTimeout(() => {
    //   setAddedToCart(false);
    // }, 6000);
  };

  const itemCount = (itemDescription, itemId, itemName, itemSalePrice) => {
    const itemToCount = {
      id: itemId,
      description: itemDescription,
      name: itemName,
      salePrice: itemSalePrice,
    };
    const count = useSelector(state => getItemCount(state, itemToCount));
    return count;
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image src={url} style={{height: w(20), width: w(20)}} />
        <Text style={{fontSize: 50, fontFamily: 'nourd_bold'}}>{name}</Text>
      </View>
      {items.map(item => (
        <View
          key={item._id}
          style={{
            flexDirection: 'column',
            marginBottom: h(2),
            borderWidth: w(0.3),
            width: w(95),
            marginLeft: w(2.5),
            borderRadius: w(2),
            padding: h(0.5),
            borderColor: '#757575',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}
            onPress={() => navigation.navigate('product', {id: item._id})}>
            <Image
              resizeMode="contain"
              src={item.imageOne}
              style={{height: h(22), width: h(25)}}
            />
            <View style={{flexDirection: 'column', marginLeft: w(1)}}>
              <Text style={{fontFamily: 'nourd_bold', fontSize: f(2.7)}}>
                {truncateName(item.name)}
              </Text>
              <Text style={{fontFamily: 'nourd_semi_bold'}}>
                {truncateDescription(item.description)}
              </Text>
              <Text style={{fontFamily: 'nourd_regular', fontSize: f(2)}}>
                {item.salePrice} ₹
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: w(2),
              backgroundColor: 'pink',
              height: h(3.5),
              width: w(5),
            }}>
            <TouchableOpacity
              onPress={() => {
                addItemToCart(
                  item.description,
                  item._id,
                  item.name,
                  item.salePrice,
                );
              }}>
              <Text> + </Text>
            </TouchableOpacity>
            <Text>
              0
              {/* {itemCount(item.description, item._id, item.name, item.salePrice)} */}
            </Text>
            <TouchableOpacity
              onPress={() => {
                decreamentItemfromCart(
                  item.description,
                  item._id,
                  item.name,
                  item.salePrice,
                );
              }}>
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoriesLoaded;

const styles = StyleSheet.create({});
