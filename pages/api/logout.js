// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  res.setHeader("Set-Cookie", "a_name=Mike;Max-Age=0;HttpOnly,Secure");
  res.statusCode = 200;
  res.json({ message: "ok" });
};

// Max-Age가 0이면 쿠키 바로 사라짐
