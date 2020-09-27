import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { connect } from "react-redux";

import "./index.less";
import ListTable from "./ListTable";
import { getSearchList } from "./redux";

function Advertise(props) {
  let [endTime, setEndTime] = useState("空");
  let [adPosition, setAdPosition] = useState("空");
  let [adName, setAdName] = useState("空");

  useEffect(() => {
    //获取广告列表
    props.getSearchList();
  }, []);

  const panelChange = (value, dataString) => {
    setEndTime(dataString);
  };
  const positionChange = (value) => {
    setAdPosition(value);
  };
  const nameChange = (e) => {
    const { value } = e.target;
    setAdName(value);
  };
  //发送请求进行搜索，使用Form的onFinish即可
  const toSearch = () => {
    alert(`已经发送了条件为${endTime},${adPosition},${adName}的搜索`);
  };
  return (
    <div className="AdContainer">
      <div className="headerSearch">
        <div className="hs-btn">
          <p className="hs-desc">筛选搜索</p>
          <div className="hs-btn">
            <Button type="primary" onClick={toSearch}>
              搜索
            </Button>
            <Button>重置</Button>
          </div>
        </div>
        <div className="hs-form">
          <Form layout="inline">
            <Form.Item label="广告名称">
              <Input onBlur={nameChange} />
            </Form.Item>
            <Form.Item label="广告位置">
              <Select style={{ width: 120 }} onChange={positionChange}>
                <Select.Option value="pcSwipe">PC首页轮播</Select.Option>
                <Select.Option value="appSwipe">APP首页轮播</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="到期时间">
              <DatePicker onChange={panelChange} />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="list-title">
        <p>数据列表</p>
        <Button>
          <Link to="/Marketing/AddAdvertise">添加广告</Link>{" "}
        </Button>
      </div>
      <div className="list-table">
        {" "}
        <ListTable />{" "}
      </div>
    </div>
  );
}

export default connect(null, {
  getSearchList,
})(Advertise);
