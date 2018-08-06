import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';

import { mapServerURL } from '../port';
import { badges, badgesCount, caseOptions } from '../../model/home';

// import './Home.less';
import styles from './Home.less';
console.log(styles);

const eMap = window.eMap;
const Search = Input.Search;

const status = ['success', 'waitting', 'fail'];
const statusField = ['已审核', '未审核', '已过期'];

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showAdvertiseList: true,
      badges: [],
      hiddenTools: false,
      hiddenData: false,
    };
    this.mapInst = {};
  }

  componentDidMount() {
    this.initMap();
    this.setState({
      badges,
    })
  }
  initMap = () => {
    const params = {
      contain: "map",
      /*configName:'sysconfig_tdt',*/
      showLayerTree: false,
      enable3D: false,
      enabelScaleline: false,
      serverURL: mapServerURL
    }
    this.mapInst = new eMap(params, () => {
      // this.drawPoint(this.mapInst);
    });
  }
  refreshMap = option => {
    this.mapInst.drawGeometry();
    this.mapInst.clearGraphic("draw");
    this.mapInst.drawGeometry(option[0], this.drawEndHandler, option[1]);
  }
  drawEndHandler = data => {
    console.log(data);
  }
  drawPoint = () => {
    const geojsonObject = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [505217.2904534318, 306791.3740281651]
        },
        'properties': {
          'name': '监督员12'
        }
      }]
    };
    const styleJson = {
      icon: {
        anchor: [0.5, 1],
        offset: [0, 0],
        opacity: 1.0,
        rotateWithView: true,
        rotation: 0.0,
        scale: 1.0,
        crossOrigin: 'anonymous',
        src: mapServerURL + 'symbol/patrol.png'
      }
    };
    this.mapInst.locateFeatureByCoords(geojsonObject, styleJson, null, true, "graphic", { labelField: "name" });
  }
  showAdvertiseList = flag => {
    this.setState({
      // showAdvertiseList: !!flag,
      badges: !!flag ? badges : [],
    })
  }
  onSearch = () => {
    this.setState({
      badges,
    })
  }
  getCaseOption = () => {
    return caseOptions;
  }
  shrinkTools = () => {
    this.setState((preState) => ({
      hiddenTools: !preState.hiddenTools
    }))
  }
  shrinkData = () => {
    this.setState((preState) => ({
      hiddenData: !preState.hiddenData
    }))
  }
  render() {
    const { badges, hiddenTools, hiddenData } = this.state;
    return (
      <div className={styles.home}>
        <div id="map" className={styles.map} />
        <div className={styles.container}>
          <div className={styles.advertise}>
            <Search
              className={`${styles['advertise-search']} grey-shadow`}
              placeholder="搜广告位"
              onSearch={this.onSearch}
              enterButton
              size="large"
            />
            {badges && badges.length > 0 ? <div className={`${styles['advertise-list']} grey-shadow`}>
              <div className={styles['list-title']}>
                广告列表
                <Icon type="close" onClick={this.showAdvertiseList.bind(this, false)} />
              </div>
              <div className={styles['list-content']}>
                {badges.map(((badge, k) => <div key={k} className={styles['advertise-list-item']}>
                  <div className={styles['advertise-list-item-sort']}>{k + 1}</div>
                  <img src={require('../../images/advertice-badge.png')} />
                  <div className={styles['advertise-list-item-desc']}>
                    <p className={styles['hidden-word']}>编号：<a>{badge.number}</a></p>
                    <p className={styles['hidden-word']}>内容：{badge.content}</p>
                    <p className={styles['hidden-word']}>位置：{badge.address}</p>
                  </div>
                  <div className={`${styles['advertise-list-item-status']} ${styles[status[badge.status]]}`}>{statusField[badge.status]}</div>
                </div>))}
              </div>
            </div> : '并没有什么广告，嘻嘻嘻'}
          </div>
          <div className={`${styles.data} ${hiddenData ? styles.hiddenData : ''}`}>
            <div className={`grey-shadow ${styles['data-badge']}`}>
              <div className={styles.shrinkImg} onClick={this.shrinkData} />
              <div className={styles['data-list']}>
                {
                  badgesCount && badgesCount.length > 0 && badgesCount.map((item, k) => <div key={k}>
                    <span className={styles['data-item-label']} style={{ color: item.color }}>{item.label}</span>
                    <span className={styles['data-item-value']}>{item.value}</span>
                  </div>)
                }
              </div>

            </div>

            <div className={styles.chart}>
              <div className={`grey-shadow ${styles['case-chart']}`}>
                <ReactEcharts
                  option={this.getCaseOption()}
                  style={{ height: 280 }}
                />
              </div>

            </div>
          </div>

        </div>
        <div className={`grey-shadow  ${styles.tools} ${hiddenTools ? styles.hiddenTools : ''}`}>
          <div className={styles.shrinkImg} onClick={this.shrinkTools} />
          <div className={`blueGradient ${styles['tools-item']}`}>
            <div className={styles.tangle} onClick={this.refreshMap.bind(this, ['Box'])} />
            <div className={styles.circle} onClick={this.refreshMap.bind(this, ['Circle', '100'])} />
            <div className={styles.polygon} onClick={this.refreshMap.bind(this, ['Polygon'])} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

