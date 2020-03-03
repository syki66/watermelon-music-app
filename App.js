import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import Chart from './Chart';
import { WebView } from 'react-native-webview';

import IsLoading from "./IsLoading";


const MELON_LINK = "https://www.melon.com/chart/index.htm#params%5Bidx%5D=1"; // 메인차트
const CLIENT_ID = "ngEp5aNucS3CkLxgFO78bD1pbJdpaFtw";


const screenWidth = Dimensions.get('window').width; //핸드폰 가로 사이즈
console.log(screenWidth)

export default class App extends React.Component {
  state = {
    isLoading: true,
    rankData: [],
    iframeSrc: [],
    pickedIframeSrc: "null",
    pickedCover: "https://cdn1.iconfinder.com/data/icons/material-apps/512/icon-music-material-design-512.png",
    pickedTitle: "title",
    pickedName: "name"
  }


  getIframe = () => {
    let iframeArray = [];

    this.state.rankData.map((each, i) => {

        fetch(`https://api.soundcloud.com/tracks?q=${each.title}%20${each.name}&format=json&client_id=${CLIENT_ID}`).then((response) => {
          return response.json();
        }).then((res) => {
            iframeArray[i] = res[0].permalink_url;
        }).catch( (error) => {
          console.log(each.rank, error);
        })

    });

    this.setState({ iframeSrc: iframeArray });
  }


  showIframeSrc = (index) => {

    console.log(this.state.iframeSrc[index])
    
    // 선택된 요소들 대입
    this.setState({
      pickedIframeSrc: this.state.iframeSrc[index],
      pickedCover: this.state.rankData[index].cover,
      pickedTitle: this.state.rankData[index].title,
      pickedName: this.state.rankData[index].name
    });
    
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


  componentDidMount = async() => {
    await this.getChartData();
    this.getIframe();
    
  }

  render() {
    return (
      this.state.isLoading ? (
        <IsLoading />
      ) : (
          <SafeAreaView>
              
            <ScrollView style={{ marginBottom: screenWidth / 2.5}}>

              <View>
                {this.state.rankData.map((each, i) => {
                  return <TouchableOpacity
                    onPress={() => { this.showIframeSrc(i) }}
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


            <View style={styles.container}>
                <WebView
                  mediaPlaybackRequiresUserAction={false}  //이거 제일 중요함... false로 두면 오토플레이 가능...

                  scrollEnabled = "false"
                  //pc버전으로 보는거임.... 안드로이드 모바일 사클 레이아웃때메 안되서
                  //userAgent= "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36"
                  userAgent= "mozilla/5.0 (macintosh; intel mac os x 10_12_3) applewebkit/537.36 (khtml, like gecko) chrome/56.0.2924.87 safari/537.36"
                  source={{
                    html: (`
                  <html>
                    <head>

                      <meta name="viewport" content="width=device-width, user-scalable=no">






                      <style>

                      body {
                        background-color: #74d37d;
                      }

                      .play-button {
                        height: 14vw;
                        width: 14vw;
                        display: block;
                        margin: auto;
                        overflow: hidden;
                        position: relative;
                      }
                      .left {
                        height: 100%;
                        float: left;
                        background-color: #d96153;
                        width: 36%;
                        -webkit-transition: all 0.25s ease;
                        transition: all 0.25s ease;
                        overflow: hidden;
                      }
                      .triangle-1 {
                        -webkit-transform: translate(0, -100%);
                                transform: translate(0, -100%);
                      }
                      .triangle-2 {
                        -webkit-transform: translate(0, 100%);
                                transform: translate(0, 100%);
                      }
                      .triangle-1,
                      .triangle-2 {
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-color: transparent;
                        width: 0;
                        height: 0;
                        border-right: 14vw solid #74d37d;
                        border-top: 7vw solid transparent;
                        border-bottom: 7vw solid transparent;
                        -webkit-transition: -webkit-transform 0.25s ease;
                        transition: -webkit-transform 0.25s ease;
                        transition: transform 0.25s ease;
                        transition: transform 0.25s ease, -webkit-transform 0.25s ease;
                      }
                      .right {
                        height: 100%;
                        float: right;
                        width: 36%;
                        background-color: #d96153;
                        -webkit-transition: all 0.25s ease;
                        transition: all 0.25s ease;
                      }
                      .paused .left {
                        width: 50%;
                      }
                      .paused .right {
                        width: 50%;
                      }
                      .paused .triangle-1 {
                        -webkit-transform: translate(0, -50%);
                                transform: translate(0, -50%);
                      }
                      .paused .triangle-2 {
                        -webkit-transform: translate(0, 50%);
                                transform: translate(0, 50%);
                      }
                      
                      
                      
                      
                      


                      </style>



                      



                      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
                      <script src="http://w.soundcloud.com/player/api.js"></script>
                      <script>


                      $(document).ready(function() {

                         $('.parent_playbar').height( ($('.parent_playbar').width()) / 5 );
                         $('.playbar').height( ($('.parent_playbar').width()) / 5 );


                         $('.song_info').height( ($('.parent_playbar').width()) / 5 );


                        var widget = SC.Widget(document.getElementById("soundcloud_widget"));

                        
                        $(".play-button").click(function() {
                          widget.toggle();
                        });
                  
                          


   
                          let soundPos;
                          let duration;
                          function soundPosition(){
                   
                              widget.getPosition(function (pos) {
                   
                                  widget.getDuration(function (dur) {
                                      soundPos = pos/dur;
                                      duration = dur;
                                  });
                   
                              });
                              $('.playbar').width(soundPos*100+"%");
                   

                              widget.isPaused(function (isPaused) {
                                if (isPaused) {
                                  $('.play-button').addClass('paused');
                                } else {
                                  $('.play-button').removeClass('paused');
                                }
                              });

                          }
                   
                   
                          setInterval(  soundPosition, 100);
                   
                   
                          $('.parent_playbar').click(function (e) {
                              var parentOffset = $(this).offset();
                              var relX = e.pageX - parentOffset.left;

                              pickedPosition = relX / $('.parent_playbar').width();
                   
                              widget.seekTo(pickedPosition * duration);
                              
                          });
                   
              
                      });

                      </script>

                    </head>



                    <body style="margin:0px">


                      <iframe id="soundcloud_widget" style="display:none;"
                        src="https://w.soundcloud.com/player/?visual=false&url=${this.state.pickedIframeSrc}&show_artwork=false&auto_play=true&sharing=false&show_user=false"
                        allow="autoplay"
                        frameborder="no"
                      ></iframe>


                      <div style="display:grid; grid-template-rows: 1fr 1fr;">
                  

                          <div class="song_info" style="display: grid; grid-template-columns: ${screenWidth / 5}px 1fr ${screenWidth / 5}px">

                              <img src=${this.state.pickedCover} style="width:${screenWidth / 5}"/>


                              <div style="display: grid;">
                                <marquee 
                                  direction="left" 
                                  behavior="alternate"
                                  scrollamount="1"
                                  style="color: #d96153; font-size: 6vw">${this.state.pickedTitle}</marquee>
                                <marquee 
                                  direction="left" 
                                  behavior="alternate"
                                  scrollamount="2"
                                  style="color: #d96153;">${this.state.pickedName}</marquee>
                              </div>
                                    

                              <div class="play-button paused">
                                <div class="left"></div>
                                <div class="right"></div>
                                <div class="triangle-1"></div>
                                <div class="triangle-2"></div>
                              </div>
                          </div>
                  

                          <div class="parent_playbar" style=" width: 100%; background-color: #74d37d; ">
                              <div class="playbar" style=" background-color: #d96153; "></div>
                          </div>
                  

                      </div>
                    </body>
                </html>
              `)
                  }}
                />
              </View>

          </SafeAreaView>
        )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: screenWidth * 0.4,
    width: "100%",
    alignSelf: 'stretch',
    position: "absolute",
    bottom: 0,
    
  }

});