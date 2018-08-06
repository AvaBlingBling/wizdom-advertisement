import React, { Component } from 'react';
import { Tabs, Row, Col } from 'antd';

import Card from '../../components/Card';
// import './InfoDetail.less';
import styles from './InfoDetail.less';

const { TabPane } = Tabs;

export default class InfoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.detail}>
        <p>当前位置：信息管理/户外广告详情</p>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="基本信息" key="1">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="参数">
                  <div>
                    <div>dsfdsfsdfd</div>
                  </div>
                </Card>
                <Card title="时间">shijian</Card>
                <Card title="附件">shijian</Card>
              </Col>
              <Col span={12}>
                <Card title="位置">shijian</Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="审批信息" key="2" disabled >Content of Tab Pane 2</TabPane>
          <TabPane tab="规划信息" key="3" disabled >Content of Tab Pane 3</TabPane>
          <TabPane tab="拍卖纪录" key="4" disabled >Content of Tab Pane 4</TabPane>
          <TabPane tab="案件记录" key="5" disabled >Content of Tab Pane 5</TabPane>
          <TabPane tab="巡检记录" key="6" disabled >Content of Tab Pane 6</TabPane>
        </Tabs>
      </div>
    );
  }
}
