import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import Chart from './Chart';

const MELON_LINK = "https://www.melon.com/chart/index.htm#params%5Bidx%5D=1";

export default class extends React.Component {
  state = {
    isLoading: true,
    chartData: []
  }
  


  getChartData = async() => {

    let chartArray = [];

    const res = await axios.get(MELON_LINK);
    const $ = cheerio.load(res.data);

    // 랭킹 가져오기
    $('.rank').each( (index, element) => {
      chartArray[index] = {
        rank : $(element).text()
      }
    });

    // 제목 가져오기
    $('.rank01').each( (index, element) => {
      chartArray[index+1].title = $(element).text().trim();
    });

    // 가수 이름 가져오기
    $('.rank02').each( (index, element) => {
      let eachLength = $(element).text().trim().length;
      chartArray[index+1].name = $(element).text().trim().substr(0,eachLength/2);
    });

    // 앨범 커버 가져오기
    $('.image_typeAll').each( (index, element) => {
      chartArray[index+1].cover = $(element).find('img').attr('src');
    });

    chartArray.splice(0,1);
    this.setState({isLoading: false, chartData: chartArray});
    console.log(chartArray);
  }


  componentDidMount() {
    this.getChartData();
  }

  render() {
    return (
      this.state.isLoading ? (
        <Text>아직로딩중</Text>
      ) : (
          <SafeAreaView>
            <ScrollView>
              <View>
                {this.state.chartData.map((each) => {
                  return <Chart
                    key={each.rank}
                    rank={each.rank}
                    title={each.title}
                    name={each.name}
                    cover={each.cover}
                  />
                })}
              </View>
            </ScrollView>
          </SafeAreaView>
        )
    );
  }
}

