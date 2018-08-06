export const badges = [
  {
    imgUrl: '../../images/advertice-badge.png',
    number: 'GGBH201807030989',
    content: '广告内容广告内容广告内容',
    address: '苏州市吴中区光谷金融港四路汇金中心',
    status: 0
  }, {
    imgUrl: '../../images/advertice-badge.png',
    number: 'GGBH201807030989',
    content: '广告内容广告内容广告内容',
    address: '苏州市吴中区光谷金融港四路汇金中心',
    status: 1
  }, {
    imgUrl: '../../images/advertice-badge.png',
    number: 'GGBH201807030989',
    content: '广告内容广告内容广告内容',
    address: '苏州市吴中区光谷金融港四路汇金中心',
    status: 2
  }
]

export const badgesCount = [
  {
    label: '广告总数',
    value: 800300,
  }, {
    label: '大型户外广告',
    value: 600300,
  }, {
    label: '公益广告',
    value: 180300,
  }, {
    label: '规划数量',
    value: 80300,
  }, {
    label: '审批超期',
    value: 5300,
    color: '#FE9300',
  }, {
    label: '拍卖超期',
    value: 5800,
    color: '#FE9300',
  }
];

export const caseOptions = {
  title: {
    text: '案件总数',
    textStyle: {
      fontSize: 20,
      fontWeight: 700,
    },
    subtext: '60,300',
    subtextStyle: {
      color: '#326BE6',
      fontWeight: 900,
      fontSize: 24,
    }
  },
  xAxis: {
    type: 'value',
    axisTick: {
      show: false, //隐藏X轴刻度
    },
    axisLabel: {
      color: '#000',
      fontSize: 10,
    },
    axisLine: {
      lineStyle: {
        color: '#999999',
      }
    },
    // max: value => {
    //   return value.max + 200;
    // }
  },
  yAxis: {
    type: 'category',
    axisTick: {
      show: false, //隐藏Y轴刻度
    },
    axisLabel: {
      color: '#999999',
      fontSize: 12,
    },
    axisLine: {
      lineStyle: {
        color: '#999999',
      }
    },
    data: ['已处理', '转示范路', '转执法', '超期', '处置中', '待审核']
  },
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true
  },
  series: [
    {
      name: '结案',
      type: 'bar',
      barGap: '-100%',
      barWidth: 10,
      itemStyle: {
        color: params => {
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: colorList[params.dataIndex].start // 0% 处的颜色
            }, {
              offset: 1, color: colorList[params.dataIndex].end // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        barBorderRadius: [0, 50, 50, 0],
      },
      z: 2,
      data: [45000, 21000, 18000, 8000, 12000, 20050],
    }
  ]
}

const colorList = [
  {
    start: '#47cc83',
    end: '#46b161',
  }, {
    start: '#99caff',
    end: '#999bff',
  }, {
    start: '#c633fc',
    end: '#6d33d0',
  }, {
    start: '#fc9105',
    end: '#e05031',
  }, {
    start: '#fffc30',
    end: '#ffce02',
  }, {
    start: '#04c1dc',
    end: '#2f71e5',
  }
]