tailwind css config 자동생성

```bash
npx tailwindcss init
```

tailwind css nextjs검색

heroicons

lottieFiles

## notion api doc

api reference - endpoints - databases retrieve a database

노션 sdk가 아닌 fetch로 해볼것.

### postman으로 먼저 테스트

databases retrieve a database에서 shell 복사 후 포스트맨에서 import - raw text - 붙여넣기 - import

bearer Token 에 secret key

data-base id는 풀페이지로 했을때 링크

- 현재 데이터베이스에 대한 정보가 들어옴.

### query a data base

해당하는 데이터베이스의 데이터들을 가져와야함

## next js에서 데이터 가져오기

### getStaticProps

빌드될때 한번 가져옴

### getServerSideProps

매번 가져옴

### config

process.env 자동완성 ?

dovenv

### json

json formatter

### image

```error
Error: Invalid src prop (https://www.notion.so/images/page-cover/woodcuts_3.jpg) on `next/image`, hostname "www.notion.so" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
```

next.js에서는 외부에서 이미지나 데이터를 가져올때 사용하려는 소스의 도메인 설정이 돼있어야함.

### style

className='text-4xl font-bold sm:text-6xl'

sm이상에서는 6xl

className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4"

md이상에서는 3개씩 배치

다른 방법으론 flex flex-wrap 하면 넘치면 흘러내림