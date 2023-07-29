"use strict";

const express = require("express");
const app = express();

// 라우팅
const home = require("./src/routes/home"); // 해당 경로의 js파일을 읽어와줘

// 앱세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
// 현재 디렉토리 네임을 가져와서(app.js의 위치)
app.use(express.static(`${__dirname}/src/public`))

app.use("/", home); // use ->  미들웨어를 등록해주는 메서드
// 루트경로로 오면 home으로 이동하게 됨. 거기로 이동해서 안의 콜백함수가 실행됨

module.exports = app;
