//引入redux模块化工具
import { combineReducers } from "redux";

// import {goodsCategoreList} from '@pages/Shop/GoodsCategories/redux'
import { searchList } from "../../pages/Marketing/AdvertisingList/redux";
import { user } from "../../pages/Login/redux";

//合并所有页面的rudux
export default combineReducers({
  //   goodsCategoreList, //GoodsCategories页面
  searchList,
  user,
});
