import { createContext, useState } from "react";

// createContext는 Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.
// 기본값(매개변수)은 트리 안에서 적절한 Provider를 찾지 못했을 때만 쓰이는 값입니다
const AuthContext = createContext({});

// Context.Provider _ Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 합니다.
// Provider 컴포넌트는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달합니다. 하위 Provider의 값이 우선시됩니다.

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

// 값은 컨텍스트 객체 안에 들어서 그걸 불러올것.
export default AuthContext;
