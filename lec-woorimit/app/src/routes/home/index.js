"use strict"; // ECMA문법을 준수하겠다 명시

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// ctrl.home 보다는 이후 ctrl.output.home으로 해서 홈을 출력하구나를 좀 더 명시적으로.
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

// app.js와 연결해줄 필요가 있음
module.exports = router;
