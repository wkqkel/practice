import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// next.js는 마크업정의를 건너뛰는데 html이나 헤드 바디를 건들일땐 이파일이 필수적
// 앱은 글로벌 cs같은걸 작성하고 도큐맨트는 서버에서만 작동함 다름.
// 타이틀같은 속성을 넣을 땐 앱에서 넣음
