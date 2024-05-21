import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../Screens/Profile';
import Cart from '../Screens/Cart';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import OrderScreen from '../Screens/OrderScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import ProductScreen from '../Screens/ProductScreen';
import CategoriesLoaded from '../Screens/CategoriesLoaded';
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="homeScreen"
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) => {
              focused ? (
                <Icon name="home-sharp" size={20} color="#000000" />
              ) : (
                <Icon name="home-outline" size={30} color="#000000" />
              );
            },
          }}
          component={HomeScreen}></Tab.Screen>

        <Tab.Screen
          name="profile"
          options={{
            tabBarLabel: 'Categorie',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
          }}
          component={CategoriesScreen}></Tab.Screen>
        <Tab.Screen
          name="cart"
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
          }}
          component={Cart}></Tab.Screen>
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="signUp"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="main" component={BottomTabs} />
        <Stack.Screen name="orderScreen" component={OrderScreen} />
        <Stack.Screen name="category" component={CategoriesScreen} />
        <Stack.Screen name="product" component={ProductScreen} />
        <Stack.Screen name="catLoaded" component={CategoriesLoaded} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
