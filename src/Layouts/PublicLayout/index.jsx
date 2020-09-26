import React, { Suspense } from "react";
// 引入公共路由表
import { contantRoutes } from "../../config/routes";
import { Switch, Route } from "react-router-dom";

const PublicRoute = (routes) => {
  // 遍历路由表返回路由
  return routes.map((route) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        component={route.component}
        exact={true}
      ></Route>
    );
  });
};

function PublicLayout() {
  return (
    <Suspense fallback={<div>加载中。。。</div>}>
      <Switch>{PublicRoute(contantRoutes)}</Switch>
    </Suspense>
  );
}
export default PublicLayout;
