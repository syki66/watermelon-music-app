import React from 'react';
import { StyleSheet, Text, Dimensions, Alert, TouchableOpacity, Button, View, Image, StatusBar, SectionList, SafeAreaView, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const vw = Dimensions.get('window').width / 100; //핸드폰 가로 사이즈


export default function Chart({rank, title, name, cover}) {

    return (
        <View
            style={styles.container}>

            <Image
                style={{ width: 70, height: 70 }}
                source={{ uri: cover }}
            />

            <View style={styles.song_info}>
                <Text style={styles.song_info_rank}>{rank}</Text>
                <View style={styles.song_info_2}>
                    <Text numberOfLines={1} style={styles.song_info_2_title}>{title}</Text>
                    <Text numberOfLines={1} style={styles.song_info_2_name}>{name}</Text>
                </View>

            </View>
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    song_info: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: 'center'
    },
    song_info_rank: {
        flex: 1,
        fontSize: 20,
        textAlign:"center"
    },
    song_info_2: {
        flex: 5
    },
    song_info_2_title: {
        flex: 1,
        fontSize: 25
    },
    song_info_2_name: {
        flex: 1
    }
})