# melon webcrwaling

리액트 네이티브용 cheerio

npm i cheerio-without-node-native@0.20.2

import cheerio from 'cheerio-without-node-native';

멜론크롤링


사클에서 bind 쓰면 재생버튼 토글시 속도저하있음


멜론에서 cheerio 라이브러리 써서 크롤링후에 스크롤 레이아웃으로 쫙 정렬 해준뒤에 거기에 사운드 클라우드 api를 자알.. 맞게 넣어줬음


웹뷰에 밑에꺼 넣어야 안드 웹뷰 에서 오토플레이 가능함 (아이폰은 그냥가능)
그러고 userAgent= "mozilla/5.0 (macintosh; intel mac os x 10_12_3) applewebkit/537.36 (khtml, like gecko) chrome/56.0.2924.87 safari/537.36"
이거로 pc버전으로 해줘야 사운드 클라우드 pc버전으로 됨 (모바일버전은 play in this brower 클릭 해야 재생됨.. 안드로이드만)

```js
mediaPlaybackRequiresUserAction={false}
```


그러고 웹뷰에서 html 임포트가 안되서 그냥 직접 넣어서 App.js 코드 겁나 더러운거고, 
웹뷰를 사용해야 또 cdn 임포트해서 사클 음원들 세세하게 몇초 지났나 지금 몇초쯤인가 설정할수 있어서 그렇게 했고,
그거로 플레이 스탑버튼 만들고, 핸드폰 가로사이즈의 1/5 만큼의 높이를 가진 플레이바? 재생 위치  설정하는거 만들었고,


# toDos

- 랜덤플레이 기능과 정방향 플레이 기능넣기
- 트로트 카테고리 넣기
- 멜론 크롤링할때 좀더 다듬기.. 사클에서 이상한게 나옴 싸이코 나와야되는데 피카부처럼.. 아마 괄호안에 들어있는것들 삭제하면 될듯함
- 안드로이드 상태바로 침범 안하게 하기
- 멜론 순위 오르락 내리락하는것도 크롤링해서 넣어주기
- 다크모드
- 제목 같은거 길어지면 옆으로 ... 처리하기, 슬라이딩 하던가
- 자료 못가져왔으면 alert 창 띄워주기