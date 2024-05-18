import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import axios from 'axios';
const CategoriesScreen = ({navigation}) => {
  const h = responsiveFontSize;
  const w = responsiveWidth;
  const f = responsiveFontSize;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:9000/getCategory');
        setCategories(response.data);
        console.log(response);
        if (categories) {
          setLoading(false);
        }
      } catch (e) {
        console.log('error fetching categories: ' + e);
      }
    };
    loadCategories();
  }, []);
  return (
 <View style={{ flex:1, backgroundColor:'white'}}>
      <View style={{alignItems:'center'}}>
        <ScrollView showsVerticalScrollIndicator = {false}>
            {categories.map((item)=>(
              <View style={{backgroundColor:"#f1f1f1", 
              flex :1 , 
              height:h(15), 
              width:w(95),
               flexDirection:'row', 
               marginTop: h(2),
               borderRadius:h(1)}}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate('catLoaded',{name : item.name, url : item.url})}
                style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Image
                    style={{height:h(12), width:h(13)}}
                    src={item.url}
                    resizeMode='stretch'
                    />

                </TouchableOpacity>
                <View style={{backgroundColor:'white', flex:0.03}}/>

              <TouchableOpacity
               onPress={()=>navigation.navigate('catLoaded',{name : item.name, url : item.url})}
              style={{flex:2, justifyContent:'center', alignItems:'center'}}>

               <Text style={{fontSize:f(3), fontFamily:'Metropolis-SemiBold'}}> {item.name}</Text>
              </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      </View>
 <View>

 </View>
  </View>
       
 
    
   
      
  )
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
