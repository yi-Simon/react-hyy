import React, { Component } from "react";
import { Layout, Menu, Button, Popover } from "antd";
import { Route, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class SideMenu extends Component {
  renderMenu = (routes) => {
    // 返回路由列表
    return routes.map((item) => {
      if (!item.hide) {
        return (
          <SubMenu key={item.key} icon={<ShoppingOutlined />} title={item.name}>
            {/* 遍历子级，根据其权限渲染按钮 */}
            {item.children &&
              item.children.map((child) => {
                if (child.path && !child.hide) {
                  return (
                    <Menu.Item key={child.path}>
                      <Link to={child.path}>{child.name}</Link>
                    </Menu.Item>
                  );
                } else if (!child.hide) {
                  return <Menu.Item key={child.name}>{child.name}</Menu.Item>;
                }
                return;
              })}
          </SubMenu>
        );
      }
    });
  };
  render() {
    const permissionList = this.props.permissionList;
    return (
      <>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item style={{ marginTop: 0 }} key="1" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          {permissionList && this.renderMenu(permissionList)}
        </Menu>
      </>
    );
  }
}
export default withRouter(
  connect((state) => ({ permissionList: state.user.permission }))(SideMenu)
);
