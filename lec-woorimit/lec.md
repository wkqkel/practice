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

## 14강 nodemon으로 서버띄우기 | 개발 생산성 향상

```
npm i -g nodemon

killall -9 node

nodemon ./bin/www.js
```

## 15강 dom으로 html 객체 제어하기 | 프런트 기능 구현

- 프런트에서 아이디와 비밀번호를 받고 로그인 버튼을 누르면 서버로 전달하고 서버가 로직처리.
  -> 입력 값을 js에서 제어할 수 있어야함 그를 가능하게 해주는게 돔 객체
- DOM 이란 Document Object Model
- 일종의 인터페이스

- html읽다가 js읽음.
  ejs에서 쿼리셀렉터 찍기전에 console.log가 실행됨
  script에 defer/async가 있는데 defer해야함.

defer 스크립트 실행은 페이지 구성이 끝날 때까지 지연 됩니다.
async 는 제각각 실행.

```
"use strict";

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");

let count = 0;

loginButton.addEventListener("click", login);

// const로 선언하면 호이스팅 문제일어남
// Uncaught ReferenceError: Cannot access 'login' before initialization
function login() {
  const req = {
    id: id.value,
    password: password.value,
  };
  console.log(req);
}
```

## 16강 fetch | 프런트에서 서버로 데이터보내기

- fetch

```
  // 첫번째 인자로 어떤 경로로 주고 받을지 먼저 정의
  // 바디에 데이터 json형태로 전달, method,
  // 헤더에 데이터형태(Content-Type)등을 명시적으로 전달.
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
```

## 17강 로그인 API만들기 in 서버 | 프런트의 요청데이터 파싱 | body-parser

```
// src/routes/home/home.ctrl.js
// 분리
"use strict";

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    console.log(req.body);
  },
};

module.exports = { output, process };
```

```
// src/app.js
"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
// 실행 순서 bodyParser가 먼저 와야함!
app.use("/", home);

module.exports = app;
```

## 18강 로그인 인증 기능 만들기 in 서버 | 유저 데이터 만들기

```
// home.ctrl.js

const process = {
  login: (req, res) => {
    const { id, password } = req.body;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.password[idx] === password) {
        return res.json({
          success: true,
        });
      }
    }
    return res.json({
      success: false,
      message: "로그인에 실패하셨습니다.",
    });
  },
};

```

- res.json의 반환값 Promise
  - res.json()의 반환값은 Promise다.
  - 기본 res의 반환값은 Response 스트림인데,
  - .json 메서드를 통해 Response(응답) 스트림을 읽을 수 있다.
  - Response는 데이터가 모두 받아진 상태가 아니다.
  - .json()으로 Response 스트리을 가져와 완료될때까지 읽는다.
  - 다읽은 body의 텍스트를 Promise 형태로 반환한다
- \*스트림(stream)이란 실제의 입력이나 출력이 표현된 데이터의 이상화된 흐름

```
// app/src/public/js/home

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => console.log(res.json()));

```

```
// 그래서 then으로 한번 더 받아야함.
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
```

## 19강 서버의 응답데이터 처리 in 프런트

```
 fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.message);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
```

- 다음시간에는 컨트롤러를 모델로 바꿔볼거.
- 데이터를 컨트롤러가 절대 절대 절대 가지고 있으면 안되고, 모델로 분리해서 해당 데이터를 모델이 가지고 있도록 구현해줄것.
- 로직도 컨트롤러에 있으면, 컨트롤러가 추가되면, 복잡해짐. 분리시켜줄것

## 20강 mvc의 모델만들기 | oop | UserStorage 클래스

- 데이터를 가지고 있는 무언가가 모델이 될 수 도 있고, 모델을 조작해서 데이터 처리해주는 애도 모델이 될 수 있음. (둘다 만들것)

- UserStorage 구현

```
"use strict";

class UserStorage {
  static #users = {
    id: ["뽀로로", "루피", "크롱"],
    password: ["1111", "2222", "3333"],
    name: ["박상원", "권해원", "최원영"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      // hasOwnProperty
      //  객체가 특정 프로퍼티를 자기만의 직접적인 프로퍼티로서 소유하고 있는지를 판단하는데 사용
      // 프로토타입 체인은 확인 X
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }

      return newUsers;
    }, {});

    return newUsers;
  }
}

module.exports = UserStorage;
```

- 다음시간에는 로직들을 User 모델로 분리

## 21강 User 모델 | 객체지향 | 인스턴스화

지금까지 app에 다 넣고 bin은 실행 app.js는 노드를 실행할때 필요한 셋팅들
그리고 mvc에 맞게 구조를 잡음
ctrl에서 로직을 분리할 것(모델을 통해서)

```
// before
// home.ctrl.js
 login: (req, res) => {
    const { id, password } = req.body;
    const users = UserStorage.getUsers("id", "password");

    const response = {};
    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.password[idx] === password) {
        response.success = true;
        return res.json(response);
      }
    }
    response.success = false;
    response.message = "로그인에 실패하셨습니다.";
    return res.json(response);
  },
```

```
// after
// home.ctrl.js
login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
  },

// UserStorage
  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

// User
  login() {
    const { id, password } = UserStorage.getUserInfo(this.body.id);
    if (id === this.body && password === this.body.password) {
      return { success: true };
    }

    return { success: false, message: "로그인에 실패하셨습니다." };
  }

```

## 22강 로그인화면꾸미기 | 오픈소스 사용해보기 | 코드펜

- codepen comments 스크롤 최하단 저작권 확인하고 사용, 코드 최상단에 주석으로 명시

## 23강 회원가입 화면 만들기 | 코드펜

## 24강 회원가입 요청 구현 in 프론트 | fetch | ajax

form 은 기본적으로 submit함. 페이지가 리로드됨
(p태그로 바꿈 , css도 바꿔줘야 해서 별로임 + 시맨틱하지않음)

다른 방법

```
<div class="form" onsubmit="return false;">
또는
버튼 함수에 event.preventDefault() 같은거
```

## 25강 회원가입 라우팅 & 기능구현 in 서버 | 깃 버전관리 | tag

파일에 저장하는거 다음 시간 구현.

- 깃 태그 구현
  ```
    git tag v0.1.0-notDB // 깃 태그 추가
    git tag // 리스트 확인
    git push origin v0.1.0-notDB
    git push origin :v0.1.0-notDB // 푸쉬한 깃 태그 삭제
    git tag -d v0.1.0-notDB // 로컬에서 태그 삭제
  ```

## 26강 데이터 파일로 관리하기 | fs(파일시스템) | json

- 지난 시간까지 데이터베이스 없이 함.
- 이번엔 데이터베이스를 만들것.
- 실제 사용하기 전에, 이번엔 파일로 데이터를 관리

```
   fs.readFile("./package.json", (err, data) => {
      if (err) throw err;
      console.log(data); // readFile로 보면 버퍼 데이터(16진수)로 보임(실제론 2진수이지만 보여주는 것만 16진수)
      console.log(JSON.parse(data))
    });
```

## 27강 파일 DB로 로그인 구현 | promise와 async, await로 비동기 최적화

- const fs = require("fs").promises;
- 하면 promise로 변환하게 됨.
- then과 catch사용가능

```
console.log(UserStorage.getUserInfo(client.id));
```

하면 data를 반환하기전에 찍힘.
프로미스를 반환하기 때문에 then이나 await로 기다려줄 수 있는데, 가독성 때문에 await 사용!

```
// login 실행하는데도 오래걸리니까 login 함수를 싱행하는 곳에도 await를 걸어줘야함.
// async await는 자체적으로 promise를 반환해주도록 설정돼어있음
// User.js
  async login() {
    const client = this.body;
    const { id, password } = await UserStorage.getUserInfo(client.id);

    if (id === client.id && password === client.password) {
      return { success: true };
    }

    return { success: false, message: "로그인에 실패하셨습니다." };
  }
// home.ctrl.js
 login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },
```

## 28강 파일db로 회원가입 구현 | promise와 async await로 비동기 최적화

- 에러처리
  - 함수에서 throw new Error하고 사용처에서 try catch로 처리

## 29강 서버API테스트도구 | Postman | curl

- 프론트없이도 테스트하는 방법
- curl: 리눅스 기반 터미널 기본 제공

```
// curl
// get
curl http://localhost:3000/login

// post
curl http://localhost:3000/login -X POST -d '{"id":"뽀로로","password":"1111"}' -H "Content-Type: application/json"
curl http://localhost:3000/register  -d '{"id":"뽀로로2","password":"1111"}' -H "Content-Type: application/json"
```

postman - myspace에 요청 등록해두고 사용.

## 30강 aws rds 대여 | 과금 안되도록 주의 | 클라우드 | mysql

- 클라우드를 이용해 데이터베이스서킷을 구축해볼 것.

1. aws 접속

- 구글에 aws검색 후 루트사용자로 로그인.
- IAM 사용자는 권한에 따라 부여 가능.

2. rds(관계형 데이터베이스 서비스)

- 우측 상단 지역 꼭 서울 선택
- rds검색 후 리소스 - DB인스턴스 클릭 - 데이터베이스 생성 클릭
- 표준생성으로 일일히 설정(손쉬운 생성은 돈이 지출될 수 있음)
  - 엔진옵션: MySql
  - 템플릿: 프리티어(공짜)
  - DB클러스터(인스턴스) 식별자: 리전별 고유 이름으로 설정.(강의와 똑같이 안됨.)
  - 마스터 사용자이름과 암호는 까먹으면 안됨
  - 인스턴스 크기: t2.micro 기본값 이용(지금은 기본값 t3인데 t2따라 이용)
  - 스토리지: 기본값 이용, 자동조정 활성화는 요금 부과로 끔
  - 연결(VPC)은 디폴트 이용, 퍼블릭 액세스는 예 선택(로컬에서 접속할 수 있게)
    - 가용영역은 서버가 존재하는 물리적인 공간인데, 기본설정 없음 선택.
    - 데이터베이스포트는 mysql은 보통 3306 사용.
- 추가구성
  - 초기데이터베이스이름 설정해주기
  - 자동 백업은 비활성화(추후 삭제를 안하면 돈 지불됨)
  - 삭제방지 활성화 원래는 체크해줘야함

언급 안 한건 디폴트값

- 인스턴스 세부정보
  - 엔드포인트가 접속할 수 있는 도메인.

## 31강 aws rds 한글 설정 | 파라미터 옵션 | 클라우드 | MySql

- 파라미터그룹 생성

  - rds - 파라미터그룹 - 파라미터그룹 생성 클릭
  - 파라미터그룹 패밀리 - mysql8.0
  - 그룹식별자(영상엔 안나옴) - 기본값 DB Parameter Group 그대로 사용.
  - 그룹이름 hangul
  - 그룹셋팅 hangul-setting

- 옵션 세팅

  - 만든 파라미터 그룹 들어가면 여러가지 옵션 설정가능
  - 한글을 되게 해줄거니, 문자관련 char 검색 후 바꿀 수 있는건 다 utf-8로 설정
  - colla 검색 후 collation_server와 connection utf8_general_ci로 설정
  - db인스턴스에서 수정 누르고, db파라미터 그룹 생성한 것으로 변경

- 데이터베이스 접속

  - 엔드포인트 복사
  - 터미널 열고, mysql -h [생성한인스턴스엔드포인트] -u wkqkel -p 엔터
  - -h는 호스트, -u는 유저
  - show databases

  - mysql mac 설치

    - brew install mysql
    - https://velog.io/@hevton/Mac-OS에서-mysql-설치하기-homebrew-이용

    - 에러1

      - 에러메시지: ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
      - 해결방법: brew services start mysql
      - 관련링크: https://so-es-immer.tistory.com/entry/ERROR-2002-HY000-socket-tmpmysqlsock-2-%ED%95%B4%EA%B2%B0%ED%95%98%EB%A0%A4%EA%B3%A0-brew-services-start-mysql-%ED%95%A8

    - 에러2

      - 에러메시지: ERROR 1045 (28000): Access denied for user 'sangwon'@'localhost' (using password: YES)
      - 해결방법: mysql -u root -p
      - 관련링크
        - https://bestcoding.tistory.com/3
        - 비밀번호: https://velog.io/@michael00987/MYSQL-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EB%B3%80%EA%B2%BD

    - 에러3

      - 문제: 명령어 입력해도 아무 동작 x
      - 해결방법: mysql -u wkqkel -p -h woorimit-lecture.c4jyeaimkcdd.ap-northeast-2.rds.amazonaws.com
      - https://doing7.tistory.com/33

  - 에러4

    - ERROR 2003 (HY000): Can't connect to MySQL server on 'woorimit-lecture.c4jyeaimkcdd.ap-northeast-2.rds.amazonaws.com:3306' (60)
    - https://haviolin21.tistory.com/m/43
    - 인바운드 규칙 추가 후 ip4 ip6 무관 하나씩 추가
