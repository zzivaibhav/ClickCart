import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const h = responsiveHeight;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const register = async () => {
    const user = {
      name: Name,
      email: Email,
      password: Password,
    };
    // Send request in API
    axios
      .post('http://10.0.2.2:9000/register', user)
      .then((res) => {
        console.log(res);
        Alert.alert('Registration successful', 'Try logging in');
      })
      .catch((error) => {
        Alert.alert('Registration failed', 'Retry');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Your User Name"
            onChangeText={(val) => setName(val)}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Enter Your Email"
            onChangeText={(val) => setEmail(val)}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Enter Your Password"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#fff"
          />
        </View>
        <TouchableOpacity onPress={register} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Existing User?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
    fontSize: responsiveFontSize(2),
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#fff',
    width: '60%',
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: responsiveHeight(5),
    elevation: 5,
  },
  signUpButtonText: {
    color: '#FF6B6B',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
  loginLink: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
