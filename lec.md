# 우리밋

## 1강 오리엔테이션

- 풀스택 강의 (로그인, 회원가입)
- 모듈화
- mvc

---

- 웹서버: 서버가 가지고 있는 정보를 브라우저에 응답하는 서버

---

- aws, mysql 등 이용
- oop
- tdd

---

- 깊게 보단 넓게!
- 아는게 많아져야 하나를 배워도 열을 앎!

## 2강 개발환경셋팅

- git, vsc 설치
- 리눅스 기반 터미널 사용
  - 윈도우는 git bash
  - ls는 명령프롬프트에서는 안 먹고 리눅스 기반 터미널에서만 작동.
- node 설치 lts버전

## 3강 express로 서버띄워보기

- mkdir login-lecture
- 폴더명은 만들때는 소문자로 하고, 띄어쓰기는 하이폰(-) 사용

```
const express = require("express");
const app = express();

// 3000 이라는 포트로 서버를 열어달라
// 터미널에 pwd 현재 경로 나옴
// npm i express --save // save 붙여야한다고 함
// app.listen만 있으면 서버가 띄어짐
app.listen(3000, (req, res) => {
  console.log("서버 가동");
});
// 라우팅
app.get("/", (req, res) => {
  res.send("우리밋");
});
```

## 4강 http로 서버 띄워보기

express를 안쓰고 서버 띄우기 => 왜 써야하는지 체감.

```
// http 는 내장 모듈
const http = require("http");
const app = http.createServer((req, res) => {
  // 브라우저에게 텍스트중에 html이고 캐릭터셋은 utf8이니까 해석해달라고 하면, 브라우저가 헤더를 받아서 그렇게 해줌.
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  if (req.url === "/") {
    // http는 send가 없고 end있음
    // http를 쓰면 영어는 되는데 한국어는 따로 처리해줘야함.
    res.end("여기는 루트입니다. this is root");
  } else if (req.url === "/login") {
    res.end("여기는 로그인입니다.");
  }
});

app.listen(3001, () => {
  console.log("http로 연결된 서버입니다.");
});

// 서버가 안열려있으면 빙빙 돔, 안열려있으면 서버를 찾을수 없다고 뜸
```

## 5강 로그인 화면 만들기(하드코딩으로)

```
const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("서버 가동");
});

app.get("/", (req, res) => {
  res.send("루트");
});

app.get("/login", (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" placeholder='아이디' /><br />
    <input type="text" placeholder='패스워드' /><br />
    <button>로그인</button>
  </body>
</html>
`);
});
```

## 6강 로그인 뷰(view) 최적화 | mvc의 v 분리하기

```
npm i ejs --s
// views/home에 index.ejs login.ejs파일 생성

const express = require("express");

const app = express();

// app.js에서 화면 뷰를 처리할 수 있는 뷰엔진을 셋팅해줄 것

// 앱 세팅

// 화면 뷰를 파일이 저장될 공간을 두번째파라미터로.
// html 파일을 어떤엔진으로 할지 선택가능
app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("서버 가동");
});

// 처음에 set해서 views를 루트로해놔서 안해도됨.
app.get("/", (req, res) => {
  res.render("home/index");
});

app.get("/login", (req, res) => {
  res.render("home/login");
});
```

## 7강 라우팅 분리

지난 시간엔 html을 분리했다면 이번엔 라우팅 관련 분리

```
// routes/home/index.js
"use strict"; // ECMA문법을 준수하겠다 명시

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home/index");
});

router.get("/login", (req, res) => {
  res.render("home/login");
});

// app.js와 연결해줄 필요가 있음
module.exports = router;
```

```
// app.js
"use strict";

const express = require("express");
const app = express();

const POST = 3000;
// 라우팅
const home = require("./routes/home"); // 해당 경로의 js파일을 읽어와줘

// 앱세팅
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // use ->  미들웨어를 등록해주는 메서드
// 루트경로로 오면 home으로 이동하게 됨. 거기로 이동해서 안의 콜백함수가 실행됨
app.listen(POST, () => {
  console.log("서버 가동");
});
```

## 8강 mvc의 c 컨트롤러 분리하기

라우팅안에서 컨트롤러를 분리
서비스 개발할 땐 다양한 설계패턴중 mvc를 많이 이용
라우터는 단순히 도메인으로 들어왔을 때, 클라이언트의 요청을 연결해주는 부분
실제 요청에 해당하는 기능을 수행하는 부분은 컨트롤러 (res.render~)를 분리 시켜줄 것.

```
// routes/home/home.ctrl.js
'use strict'

const home = (req, res) => {
  res.render("home/index");
};

const login = (req, res) => {
  res.render("home/login");
};

module.exports = { home, login };

// app.js
"use strict"; // ECMA문법을 준수하겠다 명시

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// ctrl.home 보다는 이후 ctrl.output.home으로 해서 홈을 출력하구나를 좀 더 명시적으로.
router.get("/", ctrl.home);
router.get("/login", ctrl.login);

// app.js와 연결해줄 필요가 있음
module.exports = router;

```

## 9강 app.listen() 모듈화 | 최적화엔 끝이 없다.

listen이 서버 실행시키는 코드로 해당 파일을 실행시켜야함
(bootstrap)

```
// bin/www.js
"use strict";

const app = require("../app");
const POST = 3000;

app.listen(POST, () => {
  console.log("서버 가동");
});

```

## 10강 package.json | package-lock.json | node_modules | npm start

```
npm init -y // init 초기화하다
```

- package.json

  - bin은 바이너리, 실행파일이 담기게 됨.
  - dependencies는 의존성
  - scripts는 패키지에서 사용하고싶은 명령어를 만들어줌.
  - 라이센스는 ISC, MIT => MIT가 가장 많이 사용되는 라이센스 중 하나

- package-lock.json
  - package.json은 범위가 명시돼있고, lock은 좀더 정확한 버전이 표시됨.
    - ^은 소수점이 차이나는 건 업데이트해서 설치.
    - ~은 맨뒤에있는 버전이 업데이트 되면 설치해달라
    - x는 어떠한 버전이든 상관없다.

```
"homepage": "",
"repository" :{
  "type": "git",
  "url": "",
}
```

- node_modules
  설치한 파일과 이를 사용하기 위해 설치되어야하는 모듈들 까지 있음.

## 11강 깃과 깃헙에 프로젝트 업로드

```
// nano
nano .gitignore
ctrl x -> y -> enter

// stage area에 있는 파일을 볼 수 있음.
git status
```

라이센스 추가
insights -> license -> add

## 12강 폴더구조 최적화

app > src + nin
src > routes + views

## 13강 프런트를 위한 js만들기 | public 폴더 연결

```
// src/js/home/login.js
// 노드에서는 접근불가 -> 미들웨어 추가
<script src="/js/home/login.js"></script>

// 현재 디렉토리 네임을 가져와서(app.js의 위치)
app.use(express.static(`${__dirname}/src/public`))

app.use("/", home); // use ->  미들웨어를 등록해주는 메서드
// 루트경로로 오면 home으로 이동하게 됨. 거기로 이동해서 안의 콜백함수가 실행됨
```
