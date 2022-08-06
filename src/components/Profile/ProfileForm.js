import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  console.log(authCtx.token);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation

    // 원래는 위 페이지에서 함수를 받아 실행하기
    // 여기선 토큰을 바디에 추가했지만, api에 따라 쿼리로 넘겨줄수도, 아니면 헤더에 'Authorization': 'Bearer abc' 해서 넘겨줄수도 있음
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJfajBZcJwfEd0MuaWvRZmbqvSYhVyh30", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
    }).then((res) => {
      history.replace("/");
      // assumption : always success
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
