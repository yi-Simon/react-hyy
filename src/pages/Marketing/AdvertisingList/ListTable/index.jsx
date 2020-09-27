import React, { Component } from "react";
import { Form, Table, Select, Button, Switch, Image } from "antd";
import { connect } from "react-redux";
//处理时间数据的格式
import moment from "moment";
import { withRouter } from "react-router-dom";
import { delAdvertise } from "../../../../api/hyy/api-hyy";
const { Option } = Select;

let data = [];

@connect((state) => ({ searchList: state.searchList }), null)
class ListTable extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  //表格选框改变，动态存储选中的表行的id
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  //点击编辑，携带该行的id进行跳转，用来判断是修改还是新增和修改的是哪一个广告
  edit = (e) => {
    console.log(
      "修改广告,Id:" + e.currentTarget.parentNode.parentNode.dataset.rowKey
    );
    let id = e.currentTarget.parentNode.parentNode.dataset.rowKey;
    this.props.history.push("/Marketing/AddAdvertise", id);
  };

  //点击删除，获取点击的那一行的id进行发送请求
  deleteAd = (e) => {
    let id = e.currentTarget.parentNode.parentNode.dataset.rowKey;
    delAdvertise(id);
  };

  //批量删除，从state中获取选中的行id，如果没有选中行则弹出提示，不发送请求
  batchDel = () => {
    let ids = [...this.state.selectedRowKeys];
    if (ids.length) {
      let promises = ids.map((item) => {
        return delAdvertise(item);
      });
      Promise.all(promises);
    } else {
      alert("没有选择任何需要删除的广告");
    }
  };

  render() {
    //控制表单渲染规则
    const columns = [
      {
        title: "编号",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "广告名称",
        dataIndex: "adName",
        key: "adName",
      },
      {
        title: "广告位置",
        dataIndex: "adAddr",
        key: "adAddr",
        render: (adAddr) => (
          <p>{adAddr === 1 ? "APP首页轮播" : "PC首页轮播"}</p>
        ),
      },
      {
        title: "广告图片",
        dataIndex: "adMap",
        key: "adMap",
        //渲染图片，直接返回一个img标签，动态传入src
        render: (adMap) => (
          <img style={{ width: 100, height: 100 }} src={adMap} />
        ),
      },
      {
        title: "时间",
        dataIndex: "time",
        key: "time",
        render: (time) => (
          <>
            <p>
              {"开始时间" +
                moment(time.startTime).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              {"结束时间" + moment(time.endTime).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </>
        ),
      },
      {
        title: "上线/下线",
        dataIndex: "line",
        key: "line",
        render: (line) => <Switch defaultChecked={line === 1} />,
      },
      {
        title: "点击次数",
        dataIndex: "click",
        key: "click",
      },
      {
        title: "生成订单",
        dadaIndex: "order",
        key: "order",
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (operation) => (
          <>
            <Button type="primary" onClick={(event) => this.edit(event)}>
              编辑
            </Button>
            <Button type="primary" onClick={(e) => this.deleteAd(e)} danger>
              删除
            </Button>
          </>
        ),
      },
    ];
    //如果页面获取到了数据，将数据传给表格控件进行渲染
    if (this.props.searchList.list) {
      data = this.props.searchList.list.map((item) => {
        return {
          key: item.id,
          number: item.id,
          adName: item.name,
          adAddr: item.type,
          adMap: item.pic,
          time: { startTime: item.startTime, endTime: item.endTime },
          line: item.status,
          click: item.clickCount,
          order: item.orderCount,
        };
      });
    }

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          bordered
        />
        <Form layout="inline">
          <Form.Item
            name="operationType"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"

              // onChange={onChange}
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              // filterOption={(input, option) =>
              //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
            >
              <Option value="jack">删除</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.batchDel} type="primary">
              确定
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

//在非Router包裹的组件中使用history，location和match，需要使用withRouter包裹暴露
export default withRouter(ListTable);
