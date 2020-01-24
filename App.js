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
    rankData: [],
    iframe: [],
    theIframe: "null"
  }


  getIframe = () => {
    let iframeArray = [];

    this.state.rankData.map((each, i) => {

        fetch(`https://api.soundcloud.com/tracks?q=${each.title}%20${each.name}&format=json&client_id=MhsRoDc6eXwJmBNd2ph1Lih2atDZEiG3`).then((response) => {
          return response.json();
        }).then((res) => {
          fetch(`https://soundcloud.com/oembed.json?auto_play=true&url=${res[0].permalink_url}`).then((response) => {
            return response.json();
          }).then((result) => {
            iframeArray[i] = result.html;
            // iframeArray[i] = result.html;
          })
        }).catch( (error) => {
          console.log(each.rank, error);
        })

    });

    this.setState({ iframe: iframeArray });
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

    rankArray.splice(0, 1); //첫번째 쓰레기값 제거
    

    this.setState({rankData: rankArray, isLoading: false});

  }

  showIframe = (index) => {
    this.setState({theIframe: this.state.iframe[index]});
  }


  componentDidMount = async() => {
    await this.getChartData();
    this.getIframe();
    
  }

  render() {
    return (
      this.state.isLoading ? (
        <Text>아직로딩중</Text>
      ) : (
          <SafeAreaView>
            <View style={styles.container}>
              <WebView 
                source={{html: this.state.theIframe}}
              />
            </View>
            <ScrollView>

              <View>
                {this.state.rankData.map((each, i) => {
                  return <TouchableOpacity
                    onPress={() => { this.showIframe(i) }}
                  >
                    <Chart
                      key={each.rank}
                      rank={each.rank}
                      title={each.title}
                      name={each.name}
                      cover={each.cover}
                    />
                  </TouchableOpacity>
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