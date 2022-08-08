import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  // 페이지에 들어오면 첫 인풋에 포커스 되게끔 하기위해 ref 설정
  useEffect(() => {
    userRef.current.focus();
  }, []);
  // 에러메시지 초기화
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // 비동기통신할것이므로 async
  const handleSubmit = async (e) => {
    // e는 전달할 필요X
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }); // axios의 장점은 error 확인위해 res.ok인지 체크할 필요없고 JSON으로 바꿔줌
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      // setSuccess(true);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus(); // 스크린리더가 aira-live를 바로 읽게됨
    }
  };
  return (
    <>
      <section>
        {/* aria-live는 실시간으로 갱신됨을 의미, assertive는 중요도가 높아서 바로 사용자에게 읽어주므로 사용에 주의 */}
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <h1>Login </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user} // 제출시 입력을 지우려할때
            required
          />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="#">Sign Up</a>
          </span>
        </p>
      </section>
      )
    </>
  );
};

export default Login;
