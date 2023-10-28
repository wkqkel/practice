import { atom, selector } from "recoil";

export const authInfoState = atom({
  key: "auth",
  default: { email: "" },
});

const isLogin = selector({
  key: "isLogin",
  get: ({ get }) => {
    return !!get(authInfoState).email;
  },
});
