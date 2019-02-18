import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';

import {applyStyle} from 'ol-mapbox-style';
import v3Style from '../../data/vectortiles/style';

const center = fromLonLat([2.272708, 48.8349086]);
const point1 = fromLonLat([2.1625014, 48.8349086]);
const point2 = fromLonLat([2.3413726, 48.8349086]);

const map = new Map({
  layers: [],
  target: 'map',
  view: new View({
    center: center,
    zoom: 12
  })
});

// overwrite private methods to expose timing
const originalRenderFrame = map.renderFrame_;
map.renderFrame_ = function (time) {
  console.timeStamp('beginFrame');
  originalRenderFrame.call(map, arguments);
  console.timeStamp('endFrame');
};
const originalPostRender = map.handlePostRender;
map.handlePostRender = () => {
  originalPostRender.call(map, arguments);
};

window.startIteration = () => {
  while (map.getLayers().getLength()) {
    map.removeLayer(map.getLayers().item(0));
  }
  const v3layer = new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url: '/data/vectortiles/v3/{z}/{x}/{y}.pbf'
    })
  });
  map.addLayer(v3layer);

  applyStyle(v3layer, v3Style, 'openmaptiles').then(() => {
    setTimeout(() => {
      map.getView().animate({zoom: 13, duration: 200, center: point1});
    }, 500);
    setTimeout(() => {
      map.getView().animate({duration: 200, center: point2});
    }, 1000);
    setTimeout(() => {
      map.getView().animate({zoom: 12, duration: 200, center: center});
    }, 1500);
    setTimeout(() => {
      endIteration();
    }, 2000);
  });
};