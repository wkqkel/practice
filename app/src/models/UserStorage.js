"use strict";

class UserStorage {
  static #users = {
    id: ["뽀로로", "루피", "크롱"],
    password: ["1111", "2222", "3333"],
    name: ["박상원", "권해원", "최원영"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      // hasOwnProperty
      //  객체가 특정 프로퍼티를 자기만의 직접적인 프로퍼티로서 소유하고 있는지를 판단하는데 사용
      // 프로토타입 체인은 확인 X
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }

      return newUsers;
    }, {});

    return newUsers;
  }
}

module.exports = UserStorage;
