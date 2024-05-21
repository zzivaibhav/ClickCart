import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const user = {
      email: email,
      password: password,
    };
    axios
      .post('http://10.0.2.2:9000/loginToApplication', user)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        console.log(token);
        AsyncStorage.setItem('authToken', token);
        Alert.alert('Congratulation', 'You have successfully logged in');
        navigation.replace('main');
        setLoading(false);
      })
      .catch((e) => {
        Alert.alert('Login Error', 'Invalid Email or Password');
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    marginBottom: responsiveHeight(5),
  },
  logo: {
    height: responsiveHeight(15),
    width: responsiveWidth(50),
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: responsiveFontSize(2),
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#333',
  },
  buttonContainer: {
    marginTop: responsiveHeight(5),
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#ff6b6b',
    width: responsiveWidth(60),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
});
