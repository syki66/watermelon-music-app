import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import Chart from './Chart';
import { WebView } from 'react-native-webview';



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
    //console.log(chartArray);
  }


  getSearchData = async() => {

  
    let title = '방탄소년단 black swan';
    let search_url = `https://api.soundcloud.com/tracks?q=${title}&format=json&client_id=MhsRoDc6eXwJmBNd2ph1Lih2atDZEiG3`;
  
    const data = await axios.get(search_url);
    
    
    console.log(data.data[0].permalink_url);
  }

  componentDidMount() {
    this.getChartData();
    this.getSearchData();
  }

  render() {
    return (
      this.state.isLoading ? (
        <Text>아직로딩중</Text>
      ) : (
          <SafeAreaView>
            <ScrollView>
              <View style={{height: 400}}>
            <WebView
                    source={{ html: '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F324224226&sharing=false&show_user=false&"></iframe>' }}
                />
                </View>
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

