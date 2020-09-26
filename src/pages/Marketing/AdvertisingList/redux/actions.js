import { GET_SEARCH } from "./constants";
import { reqGetSearch } from "../../../../api/hyy/api-hyy.js";

function getSearchListSync(data) {
  return { type: GET_SEARCH, data };
}

export function getSearchList() {
  return (dispatch) => {
    reqGetSearch().then((res) => {
      dispatch(getSearchListSync(res.data.data));
    });
  };
}
