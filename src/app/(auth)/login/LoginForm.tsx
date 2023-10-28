import styles from "./Login.module.scss";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>
          <input name="email" placeholder="이메일을 입력하세요" type="text" />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
        </div>

        <button type="submit">로그인</button>
        <button type="button">Google 계정으로 로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
