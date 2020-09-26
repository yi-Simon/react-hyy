import React, { Component } from "react";
import { setAdvertise, modifyAdvertise } from "../../../../api/hyy/api-hyy";

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Radio,
  Upload,
  message,
} from "antd";
import "./index.less";

class AddAdvertise extends Component {
  //创建ref选择器
  formRef = React.createRef();
  state = {
    value: 1,
  };
  //将关联ref选择器的表单清空
  onReset = () => {
    this.formRef.current.resetFields();
  };

  //单选框切换
  RadioChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  //表单验证通过后，发送请求，并根据是否在路由中拿到传过来id判断是新增还是修改
  onFinish = (value) => {
    console.log(value);
    const { endTime, introduction, link, name, sort, startTime } = value;
    const id = this.props.location.state;
    if (id) {
      modifyAdvertise(id, value);
    } else {
      setAdvertise(value);
    }
  };

  componentDidMount() {
    // 如果路由中有id，需要获取这个id的数据来作为默认数据
    const id = this.props.location.state;
    if (id) {
    }
  }
  render() {
    return (
      <div className="addContainer">
        <Form
          name="nest-messages"
          // labelCol={{ span: 3 }}
          wrapperCol={{ span: 9 }}
          labelAlign="right"
          onFinish={this.onFinish}
          //ref选择器关联表单
          ref={this.formRef}
        >
          <Form.Item
            name={["name"]}
            label="广告名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="广告位置">
            <Select name="addr" style={{ width: 120 }}>
              <Select.Option value="pcSwipe">PC首页轮播</Select.Option>
              <Select.Option value="appSwipe">APP首页轮播</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="startTime" label="开始时间">
            <DatePicker />
          </Form.Item>
          <Form.Item name="endTime" label="到期时间">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Radio.Group
              name="adLine"
              onChange={this.RadioChange}
              value={this.state.value}
            >
              <Radio value={1}>上线</Radio>
              <Radio value={2}>下线</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Upload
              name="adImage"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <Button type="primary">点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item name={["sort"]} label="排序">
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={["link", "adlink"]}
            label="广告链接"
          >
            <Input />
          </Form.Item>
          <Form.Item name={["introduction"]} label="广告备注">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.onReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddAdvertise;
