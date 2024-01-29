import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false)
            AsyncStorage.getItem('user_id').then((value) =>
              navigation.replace(value === null ? 'Auth' : 'MainTab'),
            )
        }, 2000)
    }, [])

    return (
      <View style={styles.container}>
        <Image
          source={require('../screens/banner_01.jpg')}
        />
        <ActivityIndicator
          animating={animating}
          color="#6990F7"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    }
})