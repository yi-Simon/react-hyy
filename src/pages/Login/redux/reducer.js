import { LOGIN, LOFINFAIL } from "./constants";

const permission = JSON.parse(sessionStorage.getItem("permissionList"));

const initUser = {
  permission,
};

export default function user(preState = initUser, action) {
  switch (action.type) {
    case "TO_LOGIN":
      return {
        ...preState,
        permission: action.data,
      };
    case "CLEAR_DATA":
      return { ...preState, permission: action.data };
    default:
      return preState;
  }
}
