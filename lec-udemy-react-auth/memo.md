## authentication

why?
some contnet should be protcted

We need to impose restrictions on API as well as on the site

#### 2steps

- 1. get access/ permission
- 2. Send request to protected resource

인증방식은 크게 서버사이드세션 또는 인증토큰을 이용(JWT)
서버사이드 세션은 서버가 특정 클라이언트의 고유 id를 생성하고 저장하고, 클라이언트에 전송.
단점: 서버와 클라이언트가 분리돼있을 경우,

1. 사용자가 이메일과 비밀번호로 서버에 자격 증명을 보내면
   서버가 그걸 서버에 저장된 이메일/비밀번호 조합과 비교해 유효성을 확인
2. 자격증명이 되면 서버가 서버만 아는 개인키를 가지고, 허가 토큰이란 것을 생성.
   안에 데이터가 인코딩된 아주 긴 "문자열"로 이메일주소를 비롯한 각종 데이터를 인코딩.
   서버는 토큰을 보관하지않고, 개인키를 가지고 유효한지 판단.

### 사용자가입 추가하기

#### firebase auth rest api이용

project생성 후 authentication탭

#### profile form

비밀번호 변경 시 이메일이 아닌 id 토큰을 보내는 이유
이메일만 아는 사람이 비밀번호 변경 api를 요청할 수 있기때문에 로그인한 유저에게만 발급되는 id토큰을 보내게 함.

#### logout

jwt방식은 서버에 내가 로그인했는지 한 상태인지 저장하지도 않고 관심도 없기때문에, 로그아웃시 따로 요청을 보내지 않아도 됨
