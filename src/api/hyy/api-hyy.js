import request from "./ajax/mockAjax";
import Ajax from "./ajax/Ajax";
//获取广告页面表格数据
export const reqGetSearch = () => request.get("/AdSearch");
//添加广告
export const setAdvertise = (data) => Ajax.post("/addAdvertise", data);
//修改广告
export const modifyAdvertise = (id, data) =>
  Ajax.patch("/addAdvertise/" + id, data);
//删除广告
export const delAdvertise = (id) => Ajax.del("/addAdvertise/" + id);
//注册用户
export const reqRegist = (data) => {
  return Ajax.post("/users", data);
};
//获取登录验证
export const reqLogin = (id) => Ajax.get("/users/" + id);
//获取用户权限列表
export const reqPermissionList = () => Ajax.get("/permissionList");
