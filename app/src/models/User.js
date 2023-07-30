"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login() {
    const { id, password } = UserStorage.getUserInfo(this.body.id);
    if (id === this.body && password === this.body.password) {
      return { success: true };
    }

    return { success: false, message: "로그인에 실패하셨습니다." };
  }
}

module.exports = User;
