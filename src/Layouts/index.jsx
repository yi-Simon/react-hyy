import React, { Component } from "react";
import { connect } from "react-redux";
import { reqPermissionList } from "../api/hyy/api-hyy";
import PrimaryLayout from "./PrimaryLayout";
import PublicLayout from "./PublicLayout";

@connect((state) => ({ permission: state.user.permission }))
class Layouts extends Component {
  render() {
    const { permission } = this.props;
    // 检测token和登录状态，因为有reducer返回token的bug，所以增加一个登录状态
    //如果登录了就返回私密布局，否则返回公共布局
    if (permission) {
      // 获取用户的权限列表
      // reqPermissionList().then((res) => {
      //   sessionStorage.setItem("permissionList", JSON.stringify(res.data));
      // });
      return (
        <>
          <PrimaryLayout></PrimaryLayout>
        </>
      );
    }
    return (
      <>
        <PublicLayout></PublicLayout>
      </>
    );
  }
}
export default Layouts;
