import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./index.less";
import { login, isLogin } from "./redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reqPermissionList } from "../../api/hyy/api-hyy";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 2 },
};

@connect((state) => ({ user: state.Token }), { login, isLogin })
class Login extends Component {
  //点击登录，表单提交方法，默认介绍参数是表单的输入
  onFinish = async (values) => {
    //这个remember可以拿来做自动登录检测，暂时默认记住
    let { username, password, remember } = values;

    if (username && password) {
      //如果填写的账号密码通过了检测，请求后台校验是否都正确
      let res = await this.props.login(username);
      //暂时这里接收账号信息在前台校验
      if (res) {
        if (res.password === password) {
          let { id, password } = res;
          //使用账号信息冒充token，这里还可以给token加一个过期时间
          //添加登录状态是为了解决token在reducer返回的bug
          //将token和登录状态存到本地缓存
          // localStorage.setItem("is_Login", true);
          localStorage.setItem(
            "user_key",
            JSON.stringify({ username, password })
          );
          //将登录状态保存到redux，处理获取不到localStorage的bug
          this.props.isLogin(true);

          reqPermissionList().then((res) => {
            sessionStorage.setItem("permissionList", JSON.stringify(res.data));
            this.props.history.replace("/");
          });
          // 登录成功跳转首页
        } else {
          alert("您输入的账号或密码有误");
        }
      } else {
        alert("您输入的账号或密码有误");
      }
    }
  };

  render() {
    return (
      <div className="login-Container">
        <p className="login-title">登录</p>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "必填项" },
              {
                pattern: /^[0-9]+$/,
                message: "只能输入数字",
              },
              {
                min: 4,
                message: "只能是4位数字",
              },
              {
                max: 4,
                message: "只能是4位数字",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button className="btn">{<Link to="/Regist">注册</Link>}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
