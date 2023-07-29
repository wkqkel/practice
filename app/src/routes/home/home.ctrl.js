"use strict";

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const users = {
  id: ["뽀로로", "루피", "크롱"],
  password: ["1111", "2222", "3333"],
};

const process = {
  login: (req, res) => {
    const { id, password } = req.body;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.password[idx] === password) {
        return res.json({
          success: true,
        });
      }
    }
    return res.json({
      success: false,
      message: "로그인에 실패하셨습니다.",
    });
  },
};

module.exports = { output, process };
