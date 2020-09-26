import { GET_SEARCH } from "./constants";

const initSearch = {
  searchList: {
    list: [],
    pageNum: 0,
    pageSize: 5,
    total: 0,
    totalPage: 2,
  },
};

export default function SearchList(preState = initSearch, action) {
  switch (action.type) {
    case GET_SEARCH:
      return { ...preState.searchList, ...action.data.data };
    default:
      return preState;
  }
}
