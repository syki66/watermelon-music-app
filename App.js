import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, SafeAreaView, ScrollView } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import Chart from './Chart';
import { WebView } from 'react-native-webview';


const MELON_LINK = "https://www.melon.com/chart/index.htm#params%5Bidx%5D=1";



export default class App extends React.Component {
  state = {
    isLoading: true,
    rankData: []
  }


  getChartData = async() => {
    let rankArray = [];

    const res = await axios.get(MELON_LINK);
    const $ = cheerio.load(res.data);

    // 랭킹 가져오기
    $('.rank').each( (index, element) => {
      rankArray[index] = {
        rank : $(element).text()
      }
    });

    // 제목 가져오기
    $('.rank01').each( (index, element) => {
      rankArray[index+1].title = $(element).text().trim();
    });

    // 가수 이름 가져오기
    $('.rank02').each( (index, element) => {
      let eachLength = $(element).text().trim().length;
      rankArray[index+1].name = $(element).text().trim().substr(0,eachLength/2);
    });

    // 앨범 커버 가져오기
    $('.image_typeAll').each( (index, element) => {
      rankArray[index+1].cover = $(element).find('img').attr('src');
    });

    rankArray.splice(0,1); //첫번째 쓰레기값 제거


    this.setState({rankData: rankArray});

    //this.setState({rankData: rankArray});


    
    // html 형식 iframe 값 가져오기
    // rankArray.map((each, i) => {
    //   rankArray[i].iframe = this.getSearchData(each.title, each.name);
    // })
    

    // rankArray.map((each, i) => {
    //   this.getSearchData(each, i, each.title, each.name);
    // })
    
    
    // for (let i = 0; i < rankArray.length; i++) {
    //   rankArray[i].iframe =  this.getSearchData(rankArray[i].title, rankArray[i].name);
    // } 



    


    // rankArray.map( (each) => {
    //   each.iframe = this.getSearchData(each.title, each.name);
      
    // })
  

  }



  // getSearchData = async(title, name) => {

  //   const searchUrl = `https://api.soundcloud.com/tracks?q=${title}%20${name}&format=json&client_id=MhsRoDc6eXwJmBNd2ph1Lih2atDZEiG3`;
  //   console.log("1번", searchUrl);
  //   const searchData = await axios.get(searchUrl);
    
  //   const soundCloudUrl = searchData.data[0].permalink_url
  //   console.log("2번", soundCloudUrl);

  //   const iframeUrl = `https://soundcloud.com/oembed.json?auto_play=true&url=${soundCloudUrl}`;
  //   const iframeData = await axios.get(iframeUrl);
  //   const iframeHtml = iframeData.data.html;
  //   console.log("3번", iframeHtml);
  // }

  
  componentDidMount = async() => {
    await this.getChartData();

    // let searchArray = [];

    // this.state.rankData.map( (each, i) => {
    //   searchArray[i] = getSearchData(each.name, each.title);
    // })

    console.log(this.state.rankData);
    this.setState({isLoading: false});
  }

  render() {
    return (
      this.state.isLoading ? (
        <Text>아직로딩중</Text>
      ) : (
          <SafeAreaView>
            <View style={styles.container}>
              <WebView
                source={{ html: '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F525830577&show_artwork=true&auto_play=true"></iframe>' }}
              />
            </View>
            <ScrollView>

              <View>
                {this.state.rankData.map((each) => {
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

const styles = StyleSheet.create({
  container: {
    height: 150,
    position: "relative"
  }
});
