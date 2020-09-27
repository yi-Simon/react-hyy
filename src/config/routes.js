import React from "react";

const Login = React.lazy(() => import("../pages/Login"));
const Regist = React.lazy(() => import("../pages/Regist"));
const NotFound = React.lazy(() => import("../pages/404"));

export const contantRoutes = [
  {
    path: "/",
    component: Login,
    title: "登录",
  },
  {
    path: "/login",
    component: Login,
    title: "登录",
  },
  { path: "/Regist", component: Regist, tltle: "注册" },
  {
    path: "*",

    component: NotFound,
  },
];

export const defaultRoute = [
  {
    path: "/",
    component: "Home",
    title: "后台管理系统",
  },
];
