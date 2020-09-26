import { LOGIN, LOFINFAIL } from "./constants";

const initToken = JSON.parse(localStorage.getItem("user_key"));

export default function Token(preState = initToken, action) {
    switch (action.type) {
        case LOGIN:
            return action.data;
            // case LOFINFAIL:
            //   console.log(action.data);
            //   return action.data;
        default:
            return preState;
    }
}