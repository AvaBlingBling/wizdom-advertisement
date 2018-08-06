import React, { Component } from 'react';
import { Form, Select, Button, Icon, Table, Modal } from 'antd';

import Card from '../../components/Card';
import EMap from '../../components/EMap';
import { dataSource } from '../../model/Info';

// import './Info.less';
import styles from './Info.less';

const FormItem = Form.Item;
const { Option } = Select;

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
      advertise: dataSource,
      selectedRowKeys: [],
      previewVisible: false,
    }
  }
  componentDidMount() {

  }

  handleSearch = values => {
    this.setState({
      advertise: dataSource,
    })
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  clickMapAffix = (e) => {
    this.setState((state => ({
      showMap: !state.showMap,
    })))
  }

  newInfo = hash => {
    window.location.href = hash;
  }

  previewImage = imgUrl => {
    this.setState({
      previewImage: imgUrl,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  render() {
    const { selectedRowKeys, advertise, showMap, previewImage, previewVisible } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
      }, {
        title: '广告编号',
        dataIndex: 'number',
        render: (text, record) => <a href={`#/info/detail/${record.key}`}>{text}</a>
      }, {
        title: '图片',
        dataIndex: 'imgUrl',
        render: (text) => <img src={text} className={styles['info-table-img']} onClick={this.previewImage.bind(this, text)} />
      }, {
        title: '广告内容',
        dataIndex: 'content',
        width: '20%'
      }, {
        title: '大类',
        dataIndex: 'dalei',
      }, {
        title: '小类',
        dataIndex: 'xiaolei',
      }, {
        title: '广告材质',
        dataIndex: 'material',
      }, {
        title: '广告公司',
        dataIndex: 'enterprise',
      }, {
        title: '所在道路',
        dataIndex: 'road',
      }, {
        title: '设置地点',
        dataIndex: 'address',
      }
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const pagination = {
      defaultPageSize: 20,
      total: advertise.length,
      showQuickJumper: true,
      showTotal: total => `合计 ${total} 条`,
      showSizeChanger: true,
    }
    return (
      <div className={`${showMap ? styles['show-map'] : ''} ${styles.info}`}>
        <p className={styles['cur-position']}>当前位置：信息管理/户外广告管理</p>
        <div className={styles['info-search']}>
          <Card title="查询条件">
            <WrappedForm handleSearch={this.handleSearch} />
          </Card>
        </div>
        <div className={styles['info-content']}>
          <div className={styles['button-groups']}>
            <Button type="primary" onClick={this.newInfo.bind(this, '#/info/new')}><Icon type="plus-circle-o" />新增</Button>
            <Button disabled={selectedRowKeys.length !== 1} onClick={this.newInfo.bind(this, `#/info/edit/${selectedRowKeys[0]}`)}><Icon type="edit" />编辑</Button>
            <Button disabled={selectedRowKeys.length === 0} type="danger"><Icon type="delete" />删除</Button>
            <Button disabled={selectedRowKeys.length === 0}><Icon type="export" />导出</Button>
          </div>
          <Table rowSelection={rowSelection} dataSource={advertise} columns={columns} pagination={pagination} />
        </div>
        <div className={styles['map-affix']} onClick={this.clickMapAffix}>
          <img src={require('../../images/map-logo.png')} alt="显示地图" />
        </div>
        {showMap && <div className={styles['map-content']} >
          <EMap />
        </div>}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

class SearchForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //   if (!err) {
      console.log('Received values of form: ', values);
      this.props.handleSearch(values);
      //   }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="广告类型" {...formItemLayout}>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'Please select' }],
          })(
            <Select placeholder="请选择">
              <Option value="male">1</Option>
              <Option value="female">2</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label="大类" {...formItemLayout}>
          {getFieldDecorator('dalei', {
            rules: [{ required: true, message: 'Please select' }],
          })(
            <Select placeholder="请选择">
              <Option value="male">1</Option>
              <Option value="female">2</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label="小类" {...formItemLayout}>
          {getFieldDecorator('xiaolei', {
            rules: [{ required: true, message: 'Please select' }],
          })(
            <Select placeholder="请选择">
              <Option value="male">1</Option>
              <Option value="female">2</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label="广告公司" {...formItemLayout}>
          {getFieldDecorator('advertisor', {
            rules: [{ required: true, message: 'Please select' }],
          })(
            <Select placeholder="请选择">
              <Option value="male">1</Option>
              <Option value="female">2</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label="所在道路" {...formItemLayout}>
          {getFieldDecorator('road', {
            rules: [{ required: true, message: 'Please select' }],
          })(
            <Select placeholder="请选择">
              <Option value="male">1</Option>
              <Option value="female">2</Option>
            </Select>
            )}
        </FormItem>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button type="primary" ghost style={{ marginLeft: 8 }}>重置</Button>
        </div>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(SearchForm);
