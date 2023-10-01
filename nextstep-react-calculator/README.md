# react-calculator

## 🔥 Projects!

[데모 링크](https://next-step.github.io/js-calculator/)

## 🎯 기능 요구사항

- [V] 2개의 숫자에 대해 덧셈이 가능하다.
- [V] 2개의 숫자에 대해 뺄셈이 가능하다.
- [V] 2개의 숫자에 대해 곱셈이 가능하다.
- [V] 2개의 숫자에 대해 나눗셈이 가능하다. // 오늘이까지 테스트코드까지 헤헿
- [V] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
- [V] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
- [V] 계산 결과를 표현할 때 소수점 이하는 버림한다.
- [V] 연산의 결과값이 `Infinity`일 경우 `오류`라는 문자열을 보여준다. (아이폰 참고)
<!--
- [ ] 빈 결과화면에서 0을 여러번 입력시 0하나만 표시된다.
- [ ] 2개의 숫자와 하나의 연산이 존재할 때, 다시 연산자 입력 시 입력이 된다.
- [ ] infinity일 경우에 연산자 입력이 안된다 -->

## 작업순서

1.cra를 이용한 ts, eslint 환경 셋팅

```bash
npx create-react-app . --template typescript
npm i
```

.vscode 및 .eslintrc, jest.config.js 붙여넣기

2.컴포넌트를 기존에 주어진 ui를 기준으로 분리

3.기능을 구현한 뒤 커스텀 훅으로 분리했습니다.
