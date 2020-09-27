import { LOGIN, LOFINFAIL } from "./constants";
import { reqLogin } from "../../../api/hyy/api-hyy";

function loginSync(data) {
  return { type: LOGIN, data };
}
// function loginFail(data) {
//   return { type: LOFINFAIL, data };
// }

export function login(username) {
  return (dispatch) => {
    return reqLogin(username).then((res) => {
      dispatch(loginSync(res.data));
      return res.data;
    });
  };
}

export function isLogin(flag) {
  return {
    type: "Is_Login",
    data: flag,
  };
}

export function clearRedux() {
  return {
    type: "CLEAR_DATA",
    data: null,
  };
}
