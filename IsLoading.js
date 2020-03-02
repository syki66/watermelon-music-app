import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, Alert, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';


// 스플래시랑 똑같은 이미지로 구현

export default function IsLoading () {
    return (
        <View>
            <Image
                style={{ width: '100%', height: '100%', resizeMode:'cover'}}
                source={require('./assets/splash2.png')}
            />
        </View>
    );
}