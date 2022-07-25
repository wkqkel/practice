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
