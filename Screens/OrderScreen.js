import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const OrderScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <View>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <Text>Loaded</Text>
        </View>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
