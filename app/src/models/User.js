"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login() {
    const client = this.body;
    const { id, password } = UserStorage.getUserInfo(client.id);
    if (id === client.id && password === client.password) {
      return { success: true };
    }

    return { success: false, message: "로그인에 실패하셨습니다." };
  }

  register() {
    const client = this.body;
    const response = UserStorage.save(client);
    return response;
  }
}

module.exports = User;
