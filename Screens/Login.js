import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './HomeScreen';
const Login = ({navigation}) => {
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.replace('main');
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post('http://10.0.2.2:8000/login', user)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        console.log(token);
        AsyncStorage.setItem('authToken', token);

        Alert.alert('Congratulation', 'You have successfully logged in');
        navigation.replace('main');
      })
      .catch(e => {
        Alert.alert('Login Error', 'Invalid Email or Password');
        console.log(e);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{flex: 2}}>
        <Image
          source={require('../assets/Logo.png')}
          style={{height: h(15), width: w(100)}}
        />
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          placeholder="Enter Email"
          onChangeText={value => setEmail(value)}
          style={{
            backgroundColor: 'yellow',
            width: w(60),
            borderRadius: w(3.5),
          }}
        />
        <TextInput
          placeholder="Enter Password"
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          style={{
            backgroundColor: 'yellow',
            width: w(60),
            borderRadius: w(3.5),
          }}
        />
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'pink',
            width: w(25),
            height: h(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
