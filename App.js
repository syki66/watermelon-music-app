import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import Chart from './Chart';
import { WebView } from 'react-native-webview';


const MELON_LINK = "https://www.melon.com/chart/index.htm#params%5Bidx%5D=1";

const screenWidth = Dimensions.get('window').width; //핸드폰 가로 사이즈


export default class App extends React.Component {
  state = {
    isLoading: true,
    rankData: [],
    iframe: [],
    theIframeSrc: "null"
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

  showIframeSrc = (index) => {
    //this.setState({theIframeSrc: this.state.iframe[index]});
    const $ = cheerio.load(this.state.iframe[index]); // iframe에서 src값만 추출
    const iframeSrc = $('iframe').attr('src');
    console.log(iframeSrc)
    this.setState({theIframeSrc: iframeSrc})

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
              
            <ScrollView>

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
                  scrollEnabled = "false"
                  
                  source={{
                    html: (`
                  <html>
                    <head>
                    <meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5">
                      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
                      <script src="http://w.soundcloud.com/player/api.js"></script>
                      <script>


                      $(document).ready(function() {

                         $('.parent_playbar').height( ($('.parent_playbar').width()) / 5 );
                         $('.playbar').height( ($('.parent_playbar').width()) / 5 );


                         $('.song_info').height( ($('.parent_playbar').width()) / 5 );


                        var widget = SC.Widget(document.getElementById("soundcloud_widget"));




                        
                        $(".play").click(function() {
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


                      <div style="display:grid; grid-template-rows: 1fr 1fr;">
                  

                          <div class="song_info" style="display: grid; grid-template-columns: 1fr 1fr;">
                              <iframe id="soundcloud_widget" style="display:block;"
                                  src=${this.state.theIframeSrc}
                                  frameborder="no"></iframe>
                              <div class="play" style="background-color: red"></div>
                          </div>
                  

                          <div class="parent_playbar" style=" width: 100%; background-color: gray; ">
                              <div class="playbar" style=" background-color: orange; "></div>
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