## next.js

npx create-react-app . //설치
yarn dev // 실행

장점

- 컴파일과 번들링이 자동으로 된다
- 자동리프레쉬 기능으로 화면에 바로 반영
- 서버사이드렌더링 지원 // 소스코드 열어보면 확인가능
- 스태틱 파일 지원 // 퍼블릭 폴더 밑에

## pages 폴더

- pages폴더안에 파일을 만들면 알아서 라우팅 처리
- []를 통한 다이나믹 라우팅 지원

1. pages폴더의 이름을 가져다 next.js가 url의 이름으로 씀.
2. 반면 컴포넌트의 이름은 중요하지 않음. 중요한건 export default
3. 또 기본적으로 404 not found페이지 제공
4. 몇가지 예외
   4-1. index는 홈으로.
   4-2. jsx할 필요 X

## Head, Seo

Head를 사용하면 cra에선 helmet으로 구현하던거 쉽게가능 => Seo컴포넌트

```
import React from 'react';
import Head from 'next/head';

function HeadInfo({title,keyword,contents}) {
  return (
    <Head>
        <title>{"KwonHaeWon | "+title}</title>
        <meta keyword={"Assignment by Next.js "+keyword}></meta>
        <meta contents={"Assignment by Next.js"+contents}></meta>
    </Head>

  )
}

HeadInfo.defaultProps={
    title : 'KwonHaeWon',
    keyword : 'Assignment by Next.js',
    contents: 'Assignment by Next.js',
}

export default HeadInfo
```

- 페이지에서 넘겨주는 방식

```
    <Head>
        <title>KwonHaeWon | Intro </title>
        <meta keyword="Assignment by Next js"></meta>
        <meta contents="Assignment by Next js"></meta>
     </Head>

```

![](https://velog.velcdn.com/images/wkqkel/post/2b34a288-d036-4e06-a4f2-c90713ea1eb2/image.png)

```
const Post = ({ item }) => {
  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          <Item item={item} />
        </>
      )}
    </>
  );
};

```

## \_app

- 페이지 전환시 레이아웃을 유지할 수 있음
- 페이지 전환시 상태값을 유지할 수 있음
- componentDidCatch를 이용해서 커스텀 에러핸들링을 가능
- 추가적인 데이터를 페이지로 주입시켜주는게 가능
- 글로벌 css를 이곳에 선언, layout 컴포넌트도 이곳에 사용

- props로 넘겨오는 컴포넌트는 현재페이지를 의미
- pageProps는 데이터패칭 메써드를 통해 가져온 초기 객체, 사용하지 않으면 빈 객체

## Static Pre Rendering

re-Hydration원리 : next.js는 react.js를 백엔드에서 동작시켜 페이지를 미리만들고, 초기상태의 컴포넌트를 렌더링시켜서 html이 되고, next.js는 이 html을 페이지의 소스코드에 넣어주고, 유저는 js와 react.js가 로드되지않아도 미리 볼 수 있고, react가 로드되면, 이미 존재하는 것들과 연결되어서 react앱이 되서 상호작용 됨.

## \_document

## getStaticProps

// 빈화면을 그린다음 API호출을 통해 채워주는게 아니라 미리 만들어진 HTML파일을 제공
// 빈화면이 없기때문에 로딩 필요X

```
export async function getStaticProps(context){
    const id=context.params.id;
    const API_URL = `https://dummyjson.com/products/${id}`;
    const res= await axios.get(API_URL);
    return{
        props:{
            item:res.data,
        }
    }
}
```

## getServerSideProps

- 해당 코드는 클라이언트가 아니라 서버쪽에서 실행됨
- 서버사이드에서 return에 props에 객체로 주면 props로 넘겨받을 수 있음. //\_app.js의 pageProps를 넘겨받기때문
- app.js에서 home을 호출하고 getServerSideProps를 호출하고 pageProps를 통해 넘어감

- next.js에서 서버사이드컨텍스트 제공해서 파라미터 서버사이드에서 받아올 수 있음.(첫번째인자)
- 이렇게하면 이미 한번 api로 받아온 데이터를 한번 더 요청하지않고 받아옴으로써 조금 더 빠름.
- 또 이전에는 클라이언트사이드에서 url파라미터를 받아와 나중에 처리하기때문에 seo에 부적합하지만
- 서버사이드렌더링으로 params를 받아올 경우 seo에 좋음

```
import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const [title, id] = params || [];
  // 사이트 url로 접속시 서버에서 pre-render해서 보내주는데, 라우터로 받아오면 서버에서는 아직 배열이 아니라서 에러뜸.
  // 즉 이건 클라라이언트사이드렌더링으로 소스코드에서는 못 찾음.
  // 원한다면 겟사이드서버프롭스로 넘겨줘야함

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
```

또는

```
export async function getServerSideProps(){
    const apiUrl=process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(apiUrl)
    const data= await res.data.products;
    return{
      props:{
        list: data,
      }
    };
  }

```

## Redirect and Rewrite 및 API키 숨기기

redirect // source입력시 destination으로 보낼 수 있음.
rewrite // source로 마스킹 // 즉 유저가 api키를 볼수없음

```
// next.config.js
/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-blog/:path*",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;


``
```

## Link

- next.js에서는 a태그나 location.href 가 아닌(새로고침됨=>느려짐) Link 컴포넌트를 사용 // react-router-dom은 NavLink
- https://uchanlee.dev/nextjs/why-using-a-tag-in-nextjs-link/
- 링크태그에 string만 적어도 요소를 보면 a태그가 자동으로 추가되지만, 공식적으로 명시함을 선호.
- 클래스네임 등을 추가
- 또 노마드코더에서는 ul, li를 안감싸줬는데 감싸주는것이 좋을까? => 리스트임을 명시가능.

```
import Link from "next/link";
import { useRouter } from "next/router";

// import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  console.log(router);

  return (
    <nav>
      <Link href="/">
        <a
          // className={`${router.pathname === "/" ? styles.active : ""} ${
          //   styles.link
          // }`}
          className={router.pathname === "/" ? "active" : ""}
        >
          Home
        </a>
      </Link>
      <Link href="about">
        <a className={router.pathname === "/about" ? "active" : ""}>About</a>
      </Link>

      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: blue;
        }
      `}</style>
    </nav>
  );
}
```

```
import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const router = useRouter();
  let activeItem;

  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/about") {
    activeItem = "about";
  }

  function goLink(e, data) {
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "about") {
      router.push("/about");
    }
  }

  return (
    <Menu inverted>
      <Menu.Item name="home" active={activeItem === "home"} onClick={goLink} />
      <Menu.Item
        name="about"
        active={activeItem === "about"}
        onClick={goLink}
      />
    </Menu>
  );
}
```

## query, as옵션

- Link태그의 href는 next가 보내는 주소, as는 사용자가 보는 주소
- Link가 아닌 온클릭 같은 걸로 보내줄 땐 next의 useRouter를 사용해서 푸쉬

- 이미 이미지랑 제목 가지고 있으니 객체를 url로 넘겨주고 유저에게는 숨김처리 => as 옵션사용
- 이경우 클릭시 라우터로 넘겨주고 있으므로 유저가 직접 디테일 페이지 접속시는 전달이 안됨
- 따라서 나중에 getServerSideProps로 함

```
import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();

  const onClick = (id, title) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: { title },
      },
      `/movies/${id}`
    );
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <Link
            href={{
              pathname: `/movies/${movie.id}`,
              query: { title },
            }}
            as={`/movies/${movie.id}`}
          >
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();

  return {
    props: {
      results,
    },
  };
}

```

## router.isFallback,

- SSR : 첫 렌더시에 데이터도 같이 가져온다. 렌더를 한번만 수행하기 때문에 초기 로딩 속도가 빠르고, 검색 엔진에 데이터가 걸린다. 그러나 페이지를 이동할때마다 매번 데이터를 불러오기 때문에 페이지 이동 시 속도가 느리다.
- CSR : 첫 렌더시에는 페이지 로드만 수행, 다시 렌더링할 때 데이터를 불러온다. 그래서 데이터가 검색엔진에 걸리지 않는다. 대신에 데이터를 한번에 가져오기 때문에 페이지 이동시에는 속도가 빠르다

- NextJS는 SSR 기반이지만, 페이지가 로드된 이후에는 React에서 CSR을 이용하는 방식을 사용한다.

## 페이지 로드 순서

1. Next 서버에서 GET요청이 들어오면 URL에 맞는 Page를 찾는다.
2. \_app.tsx에 getInitialProps 함수가 있다면 실행한다. (공통적인 데이터를 불러올 때 사용하기 좋음)
3. 각 Page Component에 있는 getInitialProps 를 실행한다.
4. \_document.tsx의 getInitialProps 를 실행한다.
5. props는 \_app.tsx -> page Component 순서로 렌더링한다.
6. 마지막에 \_document.tsx를 통해 html 형태로 출력한다.

기본적으로 4개의 메소드는 리턴한 값을 해당 컴포넌트의 props로 전달
getInitialProps, getStaticProps, getStaticPaths, getServerSideProps 함수

1.  ![](https://velog.velcdn.com/images/wkqkel/post/f50b1cc0-e0f3-477c-85be-80bcac909536/image.png)

2.  ![](https://velog.velcdn.com/images/wkqkel/post/806ed0d7-4f45-4815-89bf-50f67c10f16f/image.png)

3.  ![](https://velog.velcdn.com/images/wkqkel/post/43248719-5036-4b69-8101-356ee8551954/image.png)

4.  ![](https://velog.velcdn.com/images/wkqkel/post/380392ad-267b-400e-a5c8-48daef321393/image.png)

## 로딩

loading state만들고 api호출 끝나면 false로

```
import Head from "next/head";
import Axios from "axios";
import { useEffect, useState } from "react";
import ItemList from "../src/component/ItemList";
import { Divider, Header, Loader } from "semantic-ui-react";

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL =
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  function getData() {
    Axios.get(API_URL).then((res) => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Home | 코딩악마</title>
      </Head>
      {isLoading && (
        <div style={{ padding: "300px 0" }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      )}
      {!isLoading && (
        <>
          <Header as="h3" style={{ paddingTop: 40 }}>
            베스트 상품
          </Header>
          <Divider />
          <ItemList list={list.slice(0, 9)} />
          <Header as="h3" style={{ paddingTop: 40 }}>
            신상품
          </Header>
          <Divider />
          <ItemList list={list.slice(9)} />
        </>
      )}
    </div>
  );
}

```

```
\*
Next js는 기본적으로 모든 페이지 사전 렌더링 (Pre-rendering)
사전에 HTML파일을 만든다는 의미
=> js껐을때 페이지 글자가 보임_ 서버사이드렌더링으로 구현하면 데이터까지도 보임
더 좋은 퍼포먼스
검색엔진최적화(SEO)


![](https://velog.velcdn.com/images/wkqkel/post/8f765ff5-9e8b-48d2-bf06-2d287d2c0f54/image.png)

![](https://velog.velcdn.com/images/wkqkel/post/b3d2bf6b-941a-4b8f-a780-6c151dc9827a/image.png)
정적으로 페이지가 만들어지다 생기를 불어넣는게 하이드레이션

프리렌더링은 두가지 형태 -차이점은 언제 html 파일을 생성하는가
1. 정적 생성
2. Server Side Rendering (SSR, Dynamic Rendering)

![](https://velog.velcdn.com/images/wkqkel/post/3956abcb-c420-40cc-85d0-b91d7bac8820/image.png)

 -빌드되는 시점에 html파일생성
 -미리 렌더링된 html파일을 요청할때마다 3명에게 줌

 ![](https://velog.velcdn.com/images/wkqkel/post/a4f7f4ab-4e06-4c09-a6f4-c39955c4eb26/image.png)
 -서버사이드렌더링은 요청할때마다 html을 만들어서줌

![](https://velog.velcdn.com/images/wkqkel/post/82b44651-3f40-42c7-a123-afdc93ee300a/image.png)

next는 페이지별로 설정가능

[정적 생성]
- 프로젝트가 빌드하는 시점에 html파일들이 생성
- 모든 요청에 재사용
- 퍼포먼스 이유로, 넥스트 js는 정적 생성을 권고
- 정적 생성된 페이지들은 CDN에 캐시
- getStaticProps / getStaticPaths

  유저가 요청하기 전에 미리 페이지를 만들어놔도 상관없으면 정적페이지
 ex) 마케팅페이지, 블로그게시물, 도움말, 문서, 제품리스트 등 미리만들어두는 경우

[서버사이드 렌더링]은 매 요청마다 html 을 생성
- 항상 최신 상태 유지
- getServerSideProps

-관리자페이지, 분석차트 등 항상 최신상태유지
 */

about은 바뀌는 데이터가 없으므로 그냥 정적페이지고,
디테일은 최신정보 유지하게끔 서버사이드렌더링,
목록은 외부에서 데이터를 가져오는 정적페이지 생성

첫 api는 화면을 그리는 api를 호출하기 떄문에 굳이 서버사이드렌더링이 필요 X
반면 디테일은 매번 내용이 바껴서, 데이터가 있어야 보여줄 수 있음
항상 최신정보를 받아오기때문에 가격 등 데이터가 변경되도 최신상태를 유지_ 대신 퍼포먼스는 좀떨어짐.

getServerSideProps에
context는 params나 응답쿼리 요청 등이 담겨서옴
리턴값에 프롭스로 넘겨주면 페이지함수에서 받을 수 있음.
```

## 에러처리

pages에 404 파일
서버에서 렌더링하면 느리다고 생각함
이 파일을 빌드타임에 정적 생성됨

```
// 404.js
import { Icon } from "semantic-ui-react";

export default function Error404() {
  return (
    <div style={{ padding: "200px 0", textAlign: "center", fontSize: 30 }}>
      <Icon name="warning circle" color="red" />
      404 : 페이지를 찾을 수 없습니다.
    </div>
  );
}

```

500서버에러 에러처리 -next는 개발모드에서는 로그를 보여주기때문에
프로덕션모드에서 확인가능
yarn build && yarn start
서버에러 페이지는 \_error.js 이 페이지는 정적으로 제공 X 서버쪽으로 어떤 에러인지

```
// _error.js
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

// 이 페이지는 정적으로 최적화 X
// 보통 에러 발생시 서버쪽으로 어떤 에러인지를 보내서 리포팅하기때문
// 이 파일만 있어도 에러페이지 처리가 둘다 가능한데, 404같은 경우는 스태틱으로 제공하는 게 훨씬 좋음
// 둘다 존재하면 404 에러 발생시 404에러 페이지 아니면 서버에러페이지 보여줌
```

## 환경변수설정

```
환경에 따라 변할 수 있는 것을 분기 처리.
예를 들어 프로덕션 환경에서 요청한 리스트가 실제 서비스에는 나오면 안됨
넥스트js는 별다른 작업없이 환경변수를 사용할 수 있도록 제공
.env.production
.env.development

사용법은 node.js환경과 browser 환경이 다름
// node js는
process.env.변수명
// browser
process.env.NEXT_PUBLIC_변수명

```

```
//.env.development
name=DEVELOPMENT
NEXT_PUBLIC_API_URL=http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline

//.env.production
name=PRODUCTION
NEXT_PUBLIC_API_URL=http://makeup-api.herokuapp.com/api/v1/products.json?brand=dior
```

```
// useEffect에 사용할 때는 (브라우저환경)
 const API_URL = process.env.NEXT_PUBLIC_API_URL;

// getServerSideProps에서는 (NodeJs환경)

import Axios from "axios";
import Head from "next/head";

import Item from "../../src/component/Item";

const Post = ({ item, name }) => {
  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          {name} 환경 입니다.
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}

```

## getStaticPaths

다이나믹 라우트도 정적페이지 생성(디테일페이지)
다이나믹은 [id]를 받는데 어떤 id를 받을지 모르므로 html파일을 모두 생성해둘 순 없음
그러나 갯수가 한정적이고, 아이디리스트를 알 수 있으면 사용가능
그 때 getStaticPaths를 사용해서 대응
// ssr으로 만들어진 폴더 view, detail은 정적페이지

```
import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Item from "../../src/component/Item";

const Post = ({ item, name }) => {
  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          {name} 환경 입니다.
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "740" } },
      { params: { id: "730" } },
      { params: { id: "729" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}

```

이 떄 fallback이 false면 없는 페이지에 대해 대응안하고
true면
getStaticPath로 전달된 경로는 빌드타임에 만들어지고,
나머지들은 최초접속시에는 프롭스가 빈 상태로 그려지고,
이후에 백그라운드에서 정적파일로 html과 json을 생성해주고,
다음 next js가 프리렌더링목록에 추가해서 두번째부터는 정적 생성된 페이지를 사용해서 새로고침해도 빠름.(빌드파일에 추가돼있음)
fallback true는 페이지가 굉장히 많을 경우 유용,
모든 제품을 프리렌더링 하고싶겠지만, 그려면 빌드타임이 늘어남
최초 접속 유저는 빈화면을 보게되지만, 이후 유저들은 빠르게 볼 수있음

넥스트 링크에는 프리패치라는 속성이 있어서 이걸 쓰게되면 첫화면이나 스크롤 했을 때 뷰포트 내부에 있는 링크들은 모두 프리로드 되고 그렇게 되면 static generation(정적생성)이 되서 빌드 파일에 보면 다 있음

## 6강 getStaticPath, isFallback

getStaticPath 이용 시 정적 생성 안된 파일의 첫화면이 비게 되는데 false라면 404 , 로딩 넣어주기
개발환경은 getStaticProps랑 getStaticPath가 요청할 때 마다 호출됨 => 그래서 프로덕션과 달리 계속 처음에 빈화면
이럴 때는 넥스트 라우터의 isFallback 사용
처음 진입하면 isFallback true고 나중에 false됨 이를 이용해 분기처리

## 7강 API Routes, 로그인 구현

Node.js serverless function으로 API endpoint를 쉽게 만들수 있습니다. 블로그 앱에는 필요하지 않지만 간단하게 사용하는 방법

로그인을 성공하면 어드민페이지로 접근
로그인된 사용자인지 아닌지는 api를 통해 알아내고, 안된 사용자면 로그인 페이지로 보냄.

localhost:3000/api/isLogin // 하면 요청결과 볼수있음

이걸 이용하면 다이나믹 api도 구현 가능 - 페이지 만들때와 동일하게 대괄호 작성
localhost:3000/api/view/55

![](https://velog.velcdn.com/images/wkqkel/post/e4ebd411-3401-48e6-9a8f-6caa7c15ffd6/image.png)

실제로는 암호화(쿠키암호화), 검증(아이디비번체크)없는 이 방법 쓰면 안됨, 작업하는 플로우만 참고
