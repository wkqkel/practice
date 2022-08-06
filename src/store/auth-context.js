import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  // 로컬스토리지의 토큰이 만료됐는지 체크
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  // 1분 = 60000밀리초 // 유효한 토큰이 없을경우 삭제

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  // 남은 시간이 있어서 유효한 토큰이 있다면 저장된 토큰과 남은 시간을 리턴
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    // setToken은 상태업데이트함수로 리액트는 이함수를 바꾸지않아 디펜던시에 추가할 필요가 없고
    // logoutTimer는 전역변수로 리액트 바깥에 있어서 할 필요없고
    // 로컬스토리지와 setTimeout은 브라우저빌트인함수라 할 필요 ㄴㄴ
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    // 로컬스토리지에는 기본형(문자열,숫자)만 저장 가능, jwt토큰은 그대로. 만약 객체형식으로 넣고싶다면 json화시켜줘야함
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    console.log(remainingTime);
    // 남은시간뒤에 로그아웃되게끔
    logoutTimer = setTimeout(logoutHandler, remainingTime); // 3000 해두면 3000초뒤에 자동로그아웃
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
    // 로그아웃핸들러를 추가(함수를 추가할때는 무한루프 고려)
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
