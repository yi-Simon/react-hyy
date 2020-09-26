import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./index.less";
import { reqRegist } from "../../api/hyy/api-hyy";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 13 },
};

function Regist(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
    let { username, password, confirm } = values;
    // 校验登录信息
    if (username && password && confirm) {
      if (password !== confirm) {
        alert("两次输入的密码不一致");
        return;
      }
      let data = { id: +username, password: password };
      // 发送请求注册
      reqRegist(data);
      props.history.replace("/login");
    } else {
      alert("请再次输入密码");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validator = (rule, value) => {
    return new Promise((resolve, reject) => {
      // console.log(rule, value)
      if (!value) {
        return reject("必填项");
      }
      if (value.length < 4) {
        return reject("至少四个字符");
      }
      if (value.length > 16) {
        return reject("最多16个字符");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return reject("只能写数字,字母,下划线");
      }

      return resolve();
    });
  };

  return (
    <div className="registContainer">
      <p className="regist-title">注册</p>
      <div className="regist-form"></div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        <Form.Item label="密码" name="password" rules={[{ validator }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="再次输入密码" name="confirm">
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button style={{ marginLeft: 20 }}>
            <Link to="/Login">登录</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(Regist);
