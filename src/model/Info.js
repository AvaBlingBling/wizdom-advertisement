const dataSource = [];
for (let i = 1; i < 50; i++) {
  const item = {
    key: i,
    index: i,
    number: 'SPBH2018070401208',
    imgUrl: require('../images/advertise-list.png'),
    content: '广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容',
    dalei: '建（构）筑物上',
    xiaolei: '屋顶户外',
    material: '金属',
    enterprise: '凯特广告公司',
    road: '武汉市金融港一路',
    address: '武汉市金融港一路B4西南侧',
  }
  dataSource.push(item);
}

const infoFormFields = [
  {
    label: '审批编号',
    id: 'number',
  }, {
    label: '申请单位',
    id: 'applyOrg',
  }, {
    label: '业主单位',
    id: 'ownerOrg',
  }, {
    label: '建设单位',
    id: 'buildOrg',
  }, {
    label: '所在道路',
    id: 'road',
  }, {
    label: '设置地点',
    id: 'address',
  }, {
    label: '负责人',
    id: 'leader',
  }, {
    label: '联系电话',
    id: 'tel',
  }
];

const infoFormValues = {
  number: 'SPBH2018070401208',
  applyOrg: '苏州市吴中区安达科技园',
  ownerOrg: '苏州市吴中区安达科技园',
  buildOrg: '苏州市吴中区安达科技园',
  road: '苏州市吴中区中环西线',
  address: '苏州市吴中区中环西线',
  leader: '张某某',
  tel: '13886299109',
  dalei: '1',
  xiaolei: '2',
  status: '1',
  property: '2',
  zerenOrg: '1',
};

export {
  dataSource,
  infoFormFields,
  infoFormValues,
};
