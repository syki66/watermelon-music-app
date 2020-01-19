import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SectionList, SafeAreaView, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';



export default function Chart({rank, title, name, cover}) {

    return (
        <View style={styles.container}>
            <View style={styles.first}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: cover }}
                />
                <Text>{rank}위 - {title} - {name}</Text>
            </View>

            <View style={styles.second}>

            </View>
        </View>

    );
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    first: {
        flex: 1
    },
    second: {
        flex: 1,
        backgroundColor: 'red'
    }
})