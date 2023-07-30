"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    const { id, password } = await UserStorage.getUserInfo(client.id);

    if (id === client.id && password === client.password) {
      return { success: true };
    }

    return { success: false, message: "로그인에 실패하셨습니다." };
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, message: err };
    }
  }
}

module.exports = User;
