1-1. 타입스크립트란? 타입이 입혀진 자바스크립트
타입스크립트는 자바스크립트와 다르게 브라우저에서 실행하기 위해 파일을 한번 변환해주는 컴파일 과정을 거쳐야한다.

1-2. 왜 타입스크립트 좋은지?
에러의 사전방지/ 자동완성
타입스크립트는 .ts 파일로 만듦

2-1 ts프로젝트 시작법
ts파일 만들고, 터미널에서
npm i typescript -g
tsc index.ts
하면 브라우저가 읽을 수 있는 js로 컴파일 됨. 매번하기보단 웹팩으로 변환

2-2 tsc로 컴파일할때 부가옵션
tsconfig.json 파일에
{
"compilerOptions": {
"allowJs": true, // 이프로젝트에 자바스크립트 허용
"checkJs": true, //@ts-check 기능역할
"noImplicitAny": true, // 모든 타입에 any라는 디폴트값 넣음
},
"include": ["./src/**/*"]
}

3부터 클래스노트 폴더 참고
