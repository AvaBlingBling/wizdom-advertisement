import React, { Component } from 'react';

import { mapServerURL } from '../pages/port';

const eMap = window.eMap;

class EMap extends Component {
  componentDidMount() {
    const params = {
      contain: "map",
      /*configName:'sysconfig_tdt',*/
      showLayerTree: false,
      enable3D: false,
      enabelScaleline: false,
      serverURL: mapServerURL
    }
    const mapInst = new eMap(params, () => {
      this.drawPoint(mapInst);
    });
  }
  drawPoint = (map) => {
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
    map.locateFeatureByCoords(geojsonObject, styleJson, null, true, "graphic", { labelField: "name" });
  }
  render() {
    return (
      <div id="map" style={{ height: '100%' }} />
    );
  }
}

export default EMap;
