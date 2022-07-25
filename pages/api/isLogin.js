// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: req.cookies.a_name });
};
