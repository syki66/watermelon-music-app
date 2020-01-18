import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';

const MELON_LINK = "https://www.melon.com/chart/index.htm#params%5Bidx%5D=1";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  


  getChartData = async() => {

    let chart_array = [];

    const res = await axios.get(MELON_LINK);
    const $ = cheerio.load(res.data);

    // 랭킹 가져오기
    $('.rank').each( (index, element) => {
      chart_array[index] = {
        rank : $(element).text()
      }
    });

    // 제목 가져오기
    $('.rank01').each( (index, element) => {
      chart_array[index+1].title = $(element).text().trim()
    });

    // 가수 이름 가져오기
    $('.rank02').each( (index, element) => {
      chart_array[index+1].name = $(element).text().trim()
    });

    console.log(chart_array);
    this.setState({isLoading: false});
  }


  componentDidMount() {
    this.getChartData();
  }

  render() {
    return (this.state.isLoading ? <Text>아직로딩중</Text> : 
    <View>
      <Text >s</Text>
      <Text >asdf</Text>
  </View>);
  }
}

