import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import React, {useState} from 'react';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const register = async() => {
    const user = {
      name: Name,
      email: Email,
      password: Password,
    };
    //send request in api
    axios
      .post('http://10.0.2.2:9000/register', user)
      .then(res => {
        console.log(res);
        Alert.alert('Registration successfull', 'try loging in');
      })
      .catch(error => {
        Alert.alert('Registration failed', 'retry');
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{flex: 3}}>
        <Image
          source={require('../assets/Logo.png')}
          style={{height: h(15), width: w(100)}}
        />
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Enter Your User Name"
          onChangeText={val => setName(val)}
          style={{
            backgroundColor: '#D3B1C2',
            width: w(60),
            fontSize: f(2),
            borderRadius: w(3.5),
            fontWeight: '500',
            textAlign: 'center',
          }}
        />

        <TextInput
          placeholder="Enter Your Email"
          onChangeText={val => setEmail(val)}
          keyboardType="email-address"
          style={{
            textAlign: 'center',
            backgroundColor: '#D3B1C2',
            width: w(60),
            fontWeight: '500',
            fontSize: f(2),
            borderRadius: w(3.5),
            alignContent: 'center',
          }}
        />
        <TextInput
          placeholder="Enter Your Password"
          onChangeText={val => setPassword(val)}
          secureTextEntry={true}
          style={{
            textAlign: 'center',
            backgroundColor: '#D3B1C2',
            width: w(60),
            fontSize: f(2),
            fontWeight: '500',
            borderRadius: w(3.5),
          }}
        />
      </View>

      <View style={{alignItems: 'center', flex: 3, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={register}
          style={{
            backgroundColor: '#613659',
            width: w(32),
            height: h(5.5),
            justifyContent: 'center',
            alignItems: 'center',
            bottom: h(15),
            borderRadius: w(5),
            elevation: 5,
            position: 'absolute',
          }}>
          <Text style={{color: 'white', fontSize: f(2), fontWeight: '600'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginBottom: h(2)}}>
          <Text style={{color: 'black', fontSize: f(2)}}>Existing User?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}>
            <Text style={{color: 'red', fontSize: f(2)}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
