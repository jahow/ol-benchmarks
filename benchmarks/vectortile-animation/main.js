import {fromLonLat} from 'ol/proj';

import apply from 'ol-mapbox-style';


apply('map', '/data/vectortiles/style.json').then((map) => {

  const center = fromLonLat([2.272708, 48.8349086]);
  const point1 = fromLonLat([2.1625014, 48.8349086]);
  const point2 = fromLonLat([2.3413726, 48.8349086]);

  map.getView().setCenter(center);
  map.getView().setZoom(12);

  // overwrite private methods to expose timing
  const originalRenderFrame = map.renderFrame_;
  map.renderFrame_ = function (time) {
    console.timeStamp('beginFrame');
    originalRenderFrame.call(map, arguments);
  };
  const originalPostRender = map.handlePostRender;
  map.handlePostRender = () => {
    originalPostRender.call(map, arguments);
    console.timeStamp('endFrame');
  };

  window.startIteration = () => {
    if (map.getLayers().getLength()) {
      map.removeLayer(map.getLayers().item(0));
    }

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
  };
})
