import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {Provider} from 'react-redux';
import store from './Store';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
