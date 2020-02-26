import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';



export default function IsLoading () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>진정해.. 아직로딩중이야..</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
        color: "#f24177",
        fontSize: 30
    }
});