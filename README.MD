# watermelon-music-app

- 멜론 차트의 노래들를 일반인이 부른 버전으로 듣는 어플리케이션

|실행 화면 1|실행 화면 2|
|:---:|:---:|
|![Capture1](https://user-images.githubusercontent.com/59393359/150672692-79f245ba-a639-4943-9232-43a8b7431547.PNG)|![Capture2](https://user-images.githubusercontent.com/59393359/150672909-f752e594-8423-4585-8363-17027eabd059.gif)|

---

## Feature

- 멜론 차트에서 크롤링한 순위 및 음악 정보 데이터 사용
- 사운드클라우드 api를 이용하여 멜론 차트의 노래와 매칭

---

## Usage

- 플레이스토어에서 다운로드

---

## Caution

- 플레이 스토어 업데이트 시 `app.json`에서 `versionCode` 숫자 올려야됨

```json
    "android": {
      "versionCode": 2
    },
```

---

## Change Log

- [CHANGELOG.MD](https://github.com/syki66/watermelon-music-app/blob/master/CHANGELOG.MD)

---

## Todo List

- 클라이언트 아이디를 크롤링 자동화하기
- 랜덤플레이 기능과 정방향 플레이 기능넣기
- 안드로이드 상태바로 침범 안하게 하기
- 차트 순위 등락 넣기
- 다크 모드
- 데이터 못가져오면 alert창 띄워주기

---

## Run

```
npm install
```

```
expo update
```

```
npm audit fix
```

- 버전 호환문제 발생시 `package.json`에서 RN 버전 수정 후 `expo install`

```
expo start --tunnel
```

> Expo Go 업데이트

---

## Build

```

```