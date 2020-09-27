import { LOGIN, LOFINFAIL } from "./constants";
import { reqLogin, reqPermissionList } from "../../../api/hyy/api-hyy";

// function loginSync(data) {
//   return { type: LOGIN, data };
// }

// export function login(username) {
//   return (dispatch) => {
//     return reqLogin(username).then((res) => {
//       dispatch(loginSync(res.data));
//       return res.data;
//     });
//   };
// }

export function login(username) {
  return () => {
    return reqLogin(username).then((res) => {
      return res.data;
    });
  };
}

function toLoginsync(data) {
  return {
    type: "TO_LOGIN",
    data,
  };
}

export function toLogin() {
  return (dispatch) => {
    return reqPermissionList().then((res) => {
      dispatch(toLoginsync(res.data));
      return res.data;
    });
  };
}

export function clearRedux() {
  return {
    type: "CLEAR_DATA",
    data: null,
  };
}
