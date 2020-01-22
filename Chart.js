import React from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity, Button, View, Image, StatusBar, SectionList, SafeAreaView, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';



export default class extends React.Component {
    state = {
        isLoading: true,
        iframe: "notyet"
    }

    getSearchData = async(title, name) => {
    
        const searchUrl = `https://api.soundcloud.com/tracks?q=${title}%20${name}&format=json&client_id=MhsRoDc6eXwJmBNd2ph1Lih2atDZEiG3`;
    
        const searchData = await axios.get(searchUrl);
        const soundCloudUrl = searchData.data[0].permalink_url
    
        const iframeUrl = `https://soundcloud.com/oembed.json?auto_play=true&url=${soundCloudUrl}`;
        const iframeData = await axios.get(iframeUrl);
        const iframeHtml = iframeData.data.html;
        console.log(iframeHtml);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => { this.getSearchData(this.props.title, this.props.name) }}
                style={styles.container}>
                <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: this.props.cover }}
                />

                <View style={styles.song_info}>
                    <Text style={styles.song_info_rank}>{this.props.rank}</Text>
                    <View style={styles.song_info_2}>
                        <Text style={styles.song_info_2_title}>{this.props.title}</Text>
                        <Text style={styles.song_info_2_name}>{this.props.name}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
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
        fontSize:50,
        width: 55
    },
    song_info_2: {
        flex: 1
    },
    song_info_2_title: {
        flex: 1,
        fontSize: 25
    },
    song_info_2_name: {
        flex: 1
    }
})