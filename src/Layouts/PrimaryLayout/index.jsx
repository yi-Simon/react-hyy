import React, { Component, Suspense } from "react";
import { Layout, Button, Popover } from "antd";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import SideMenu from "../SideMenu";
import components from "../../config/asyncComps";
import { clearRedux } from "../../pages/Login/redux";
import { connect } from "react-redux";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import "./index.css";

import Home from "../../pages/Home";

const { Header, Sider, Content } = Layout;

//获取权限列表
const permissionList = JSON.parse(sessionStorage.getItem("permissionList"));

@connect(null, { clearRedux })
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  //退出登录，清空本地缓存的用户信息和权限列表
  signOut = () => {
    localStorage.removeItem("user_key");
    localStorage.removeItem("is_Login");
    sessionStorage.removeItem("permissionList");
    // 将redux的数据设置为空
    this.props.clearRedux();
    this.props.history.replace("/");
  };

  //获取私密路由
  permissionRoute = (routes) => {
    return routes.map((item) => {
      // 如果存在子级并且有渲染权限，遍历子级并返回其路由
      if (item.children && !item.hide) {
        return item.children.map((child) => {
          if (child.component) {
            // 因为组件存在懒加载函数中，所以需要调用才能拿到组件
            const MyComponent = components[child.component]();
            return (
              <Route
                path={child.path}
                component={MyComponent}
                exact={true}
                key={child.path}
              ></Route>
            );
          }
        });
      }
    });
  };
  render() {
    //定义右上角菜单
    const content = (
      <div>
        <p>
          <Link to="/">首页</Link>
        </p>

        <p
          onClick={this.signOut}
          style={({ color: "#1DA57A" }, { cursor: "pointer" })}
        >
          退出
        </p>
      </div>
    );
    return (
      <>
        <Layout className="Layout-Sider" style={{ height: "100%" }}>
          <Sider
            style={{
              height: "100vh",
            }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            {/* 侧边栏导航 */}
            <SideMenu></SideMenu>
          </Sider>
          <Layout className="site-layout">
            {/* 页面头部 */}
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Button
                // type="primary"
                className="btn"
                onClick={this.toggleCollapsed}
                style={{ marginBottom: 16, lineHeight: 0 }}
              >
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                )}
              </Button>
              <div className="hederIcon">
                <Popover content={content} trigger="click">
                  <AppleOutlined />
                </Popover>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Suspense fallback={<div>正在加载...</div>}>
                <Switch>
                  <Route path="/" exact component={Home}></Route>
                  {permissionList && this.permissionRoute(permissionList)}
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default withRouter(PrimaryLayout);
