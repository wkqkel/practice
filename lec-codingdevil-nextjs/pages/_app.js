import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

import Top from "../src/component/Top";
import Footer from "../src/component/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Top />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;

// 페이지 전환시 레이아웃을 유지할 수 있음
// 페이지 전환시 상태값을 유지할 수 있음
// componentDidCatch를 이용해서 커스텀 에러핸들링을 가능
// 추가적인 데이터를 페이지로 주입시켜주는게 가능
// 글로벌 css를 이곳에 선언

// props로 넘겨오는 컴포넌트는 현쟆페이지를 의미
// pageProps는 데이터패칭 메써드를 통해 가져온 초기 객체 _ 사용하지 않으면 빈 객체
