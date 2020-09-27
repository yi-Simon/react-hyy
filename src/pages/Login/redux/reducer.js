import { LOGIN, LOFINFAIL } from "./constants";

// const initToken = JSON.parse(localStorage.getItem("user_key")) || "";

const initUser = {
  token: JSON.parse(localStorage.getItem("user_key")) || "",
  isLogin: false,
};

export default function user(preState = initUser, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...preState,
        token: action.data,
      };
    case "Is_Login":
      return {
        ...preState,
        isLogin: action.data,
      };
    case "CLEAR_DATA":
      return { ...preState, token: action.data, isLogin: action.data };
    default:
      return preState;
  }
}
