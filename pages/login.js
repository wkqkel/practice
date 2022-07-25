import Axios from "axios";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

export default function Login() {
  const router = useRouter();
  function login() {
    // 아이디나 비번체크같은 백엔드 작업은 건너띔
    Axios.post("/api/login").then((res) => {
      if (res.status === 200) {
        //로그인 성공
        router.push("/admin");
      }
    });
  }
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form>
        <Form.Field inline>
          <input placeholder="ID" />
        </Form.Field>
        <Form.Field inline>
          <input type="password" placeholder="Password" />
        </Form.Field>
        <Button color="blue" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
}
