import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SectionList, SafeAreaView, ScrollView } from 'react-native';


export default function Chart({rank, title, name, cover}) {

    return (
        <View>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: cover}}
        />
            <Text>{rank}위 - {title} - {name}</Text>
        </View>

    );
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24
    }
})