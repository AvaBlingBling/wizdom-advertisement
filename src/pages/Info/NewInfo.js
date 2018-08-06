import React, { Component } from 'react';
import { Row, Col, Form, Select, Input, InputNumber, Button, Icon, Table, DatePicker, Upload, Tabs, Modal, message, Spin } from 'antd';

import { infoFormFields, infoFormValues } from '../../model/Info';
import EMap from '../../components/EMap';
// import './NewInfo.less';
import styles from './NewInfo.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export default class NewInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      previewVisible: false,
      previewImage: '',
      activeKey: '1',
      formValues: [],
      loading: false,
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({
          formValues: infoFormValues,
          loading: false,
        });
      }, 1000)
    }

  }

  handleUpload = ({ file }) => {
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
      this.setState({
        fileList: [...this.state.fileList, file],
        activeKey: '2',
      })
    }

  }

  changeActiveKey = activeKey => this.setState({ activeKey })

  handleAdd = values => {
    debugger
  }

  handleCancel = () => this.setState({ previewVisible: false })

  beforeUpload = file => {
    const maxSize = 10 * 1024;
    const isImage = ['jpg', 'png', 'gif'].some(item => file.name.indexOf(item) > -1);// 格式
    if (file.size > maxSize) {
      message.error(`${file.name} 文件大小超出10M限制.`);
      return false;
    }
    if (!isImage) {
      message.error(`${file.name} 格式不支持.`);
      return false;
    }
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { fileList, previewVisible, previewImage, activeKey, formValues, loading } = this.state;
    const props = {
      loading,
      formValues,
      handleAdd: this.handleAdd,
      handleUpload: this.handleUpload,
      beforeUpload: this.beforeUpload
    };
    return (
      <div className={styles.detail}>
        <p className={styles['cur-position']}>当前位置：信息管理/新增户外广告</p>
        <Row gutter={16}>
          <Col span={12}>
            <CreateForm {...props} />
          </Col>
          <Col span={12}>
            <Tabs activeKey={activeKey} onChange={this.changeActiveKey}>
              <TabPane tab="地图定位" key="1" >
                <EMap />
              </TabPane>
              <TabPane tab="附件" key="2" >
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={this.beforeUpload}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  <Icon type="plus" />
                  <div className="ant-upload-text">点击添加图片</div>
                  <div className="ant-upload-hint">支持png/gif/jpg,不超过10M</div>
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

class MyForm extends Component {
  state = {
    dataSource: [
      {
        key: 1,
        length: '',
        kuandu: '',
        houdu: '',
        count: '',
        area: '',
      }
    ],
  }
  addSize = () => {
    this.setState(({ dataSource }) => {
      const newItem = {
        key: dataSource.length + 1,
        length: '',
        kuandu: '',
        houdu: '',
        count: '',
        area: '',
      }
      const newDataSource = [...dataSource, newItem];
      return {
        dataSource: newDataSource,
      }
    })
  }
  delete = index => {
    this.setState(({ dataSource }) => {
      const newDataSource = dataSource.filter((item, k) => k !== index);
      return {
        dataSource: newDataSource,
      }
    })
  }

  onChange = (index, key, value) => {
    // const value = e.target.value
    if (isNaN(value)) return;
    this.setState(({ dataSource }) => {
      const newDataSource = dataSource.map((item, k) => {
        if (k === index) {
          return {
            ...item,
            [key]: value,
          }
        }
        return item;
      });
      return {
        dataSource: newDataSource,
      }
    })
  }
  generateToal = () => {
    let count = 0, area = 0;
    this.state.dataSource.forEach(item => {
      count += parseFloat(item.count) || 0;
      area += parseFloat(item.area) || 0;
    })
    return { count, area };
  }
  okHandle = () => {
    const { form, handleAdd } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  render() {
    const { form, formValues } = this.props;
    const { getFieldDecorator } = form;
    const { count, area } = this.generateToal();
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    const columns = [
      {
        title: '长度',
        dataIndex: 'length',
        render: (text, record, index) => <InputNumber min={0} value={text} onChange={this.onChange.bind(this, index, 'length')} />,
        width: '18%'
      }, {
        title: '宽度',
        dataIndex: 'kuandu',
        render: (text, record, index) => <InputNumber value={text} onChange={this.onChange.bind(this, index, 'kuandu')} />,
        width: '18%'
      }, {
        title: '厚度',
        dataIndex: 'houdu',
        render: (text, record, index) => <InputNumber value={text} onChange={this.onChange.bind(this, index, 'houdu')} />,
        width: '18%'
      }, {
        title: '数量',
        dataIndex: 'count',
        render: (text, record, index) => <InputNumber value={text} onChange={this.onChange.bind(this, index, 'count')} />,
        width: '18%'
      }, {
        title: '面积',
        dataIndex: 'area',
        render: (text, record, index) => <InputNumber value={text} onChange={this.onChange.bind(this, index, 'area')} />,
        width: '18%'
      }, {
        title: '操作',
        dataIndex: 'action',
        colSpan: 0,
        render: (text, record, index) => this.state.dataSource.length > 1 ? <Button type="danger" ghost icon="delete" onClick={this.delete.bind(this, index)} /> : '',
        width: '10%'
      },
    ];

    return (
      <Spin spinning={this.props.loading}>
        {
          infoFormFields && infoFormFields.length > 0 && infoFormFields.map((formItem, k) => <Col md={12} sm={24} key={k}>
            <FormItem {...formItemLayout} label={formItem.label}>
              {getFieldDecorator(formItem.id, {
                initialValue: formValues[formItem.id],
                rules: [{ required: true, message: '请输入' }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>)
        }
        <Col md={12} sm={24}>
          <FormItem label="广告大类" {...formItemLayout}>
            {getFieldDecorator('dalei', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: formValues.dalei,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="male">1</Option>
                <Option value="female">2</Option>
              </Select>
              )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="广告小类" {...formItemLayout}>
            {getFieldDecorator('xiaolei', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: formValues.xiaolei,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="male">1</Option>
                <Option value="female">2</Option>
              </Select>
              )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="广告状态" {...formItemLayout}>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: formValues.status,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="male">1</Option>
                <Option value="female">2</Option>
              </Select>
              )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="广告性质" {...formItemLayout}>
            {getFieldDecorator('property', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: formValues.property,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="male">1</Option>
                <Option value="female">2</Option>
              </Select>
              )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="责任单位" {...formItemLayout}>
            {getFieldDecorator('zerenOrg', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: formValues.zerenOrg,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="male">1</Option>
                <Option value="female">2</Option>
              </Select>
              )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="详细尺寸" {...formItemLayout}>
            <Button type="primary" ghost size="default" style={{ width: '50%' }} icon="plus-circle-o" onClick={this.addSize}>添加尺寸</Button>
          </FormItem>
        </Col>
        <Col span={20} offset={3}>
          <Table dataSource={this.state.dataSource} columns={columns} pagination={false} />
          <div className={styles['total-flex']}>
            <div>合计：</div>
            <div>{count}</div>
            <div>{area}</div>
            <div style={{ width: '10%' }} />
          </div>
        </Col>
        <Col span={24}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} label="有效期限"
          >
            {getFieldDecorator('validity', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
              )}
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} label="钢结构检测时限"
          >
            {getFieldDecorator('deadline', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} style={{ width: '100%' }} />
              )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="标记位置" {...formItemLayout}>
            <Button type="primary" ghost size="default" style={{ width: '50%' }} icon="pushpin" onClick={this.addMark}>标记位置</Button>
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="添加附件" {...formItemLayout}>
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              showUploadList={false}
              beforeUpload={this.props.beforeUpload}
              onChange={this.props.handleUpload}
            >
              <Button type="primary" ghost size="default" style={{ width: '100%' }} icon="plus-circle-o">添加附件</Button>
            </Upload>
          </FormItem>
        </Col>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.okHandle}>保存</Button>
          <Button type="primary" ghost style={{ marginLeft: 8 }}>取消</Button>
        </div>
      </Spin>
    );
  }
}
const CreateForm = Form.create()(MyForm);
