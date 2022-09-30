import React, { useEffect, useState } from 'react';
import { Directions } from '@2gis/mapgl-directions';
import { load } from '@2gis/mapgl';

export default function MapCardAdd({}) {
  //   const [map, setMap] = useState();
  //   const [mapglAPI, setMapglAPI] = useState();
  const markers = [];
  let firstPoint;
  let secondPoint;
  const desperation = async () => {
    const mapglAPI = await load();

    // container — id of the div element in your html
    const map = new mapglAPI.Map('map-conteiner', {
      center: [37.66, 55.76],
      zoom: 10,
      key: 'd73d7bb4-4ee2-4388-b740-33bf53a2c2a7',
    });

    // const directions = new Directions(map, {
    //   directionsApiKey: 'ruccmx2050',
    // });
    // // A current selecting point
    let selecting = 'a';
    const buttonText = ['Choose two points on the map', 'Reset points'];
    const controlsHtml = `<button id="reset" disabled>${buttonText[0]}</button> `;
    if (mapglAPI) {
      new mapglAPI.Control(map, controlsHtml, {
        position: 'topLeft',
      });
    }
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function () {
      selecting = 'a';
      firstPoint = undefined;
      secondPoint = undefined;
      markers.forEach((m) => {
        m.destroy();
      });
      // directions.clear();
      // console.log(map);
      // mapglAPI.markers.getAll();
      // map.markers.removeAll();
      // console.log(map.markers);
      this.disabled = true;
      this.textContent = buttonText[0];
    });
    map.on('click', (e) => {
      const coords = e.lngLat;
      if (selecting != 'end') {
        // Just to visualize selected points, before the route is done
        markers.push(
          new mapglAPI.Marker(map, {
            coordinates: coords,
            icon: 'https://docs.2gis.com/img/dotMarker.svg',
          }),
        );
      }
      if (selecting === 'a') {
        // console.log(markers);
        firstPoint = coords;
        selecting = 'b';
      } else if (selecting === 'b') {
        secondPoint = coords;
        selecting = 'end';
      }
      // If all points are selected — we can draw the route
      if (firstPoint && secondPoint) {
        console.log('обе точки-------', firstPoint, secondPoint);

        // directions.carRoute({
        //   points: [firstPoint, secondPoint],
        //   type: 'bicycle',
        //   //   filters: [
        //   //     'ban_stairway',
        //   //     'ban_over',
        //   //     'ban_car_road',
        //   //   ],
        //   //   alternative: [2],
        // });
        // mapglAPI.Marker(firstPoint).addTo(map).bindPopup('A');
        // mapglAPI.Marker(firstPoint).addTo(map).bindPopup('B');
        // markers.forEach((m) => {
        //   m.destroy();
        // });
        resetButton.disabled = false;
        resetButton.textContent = buttonText[1];
      }
    });
  };
  useEffect(() => {
    desperation();
    // load().then((polybomu) => {
    //   const ololo = new polybomu.Map('map-conteiner', {
    //     center: [55.31878, 25.23584],
    //     zoom: 13,
    //     key: 'd73d7bb4-4ee2-4388-b740-33bf53a2c2a7',
    //   });
    //   setMap(ololo);
    //   setMapglAPI(polybomu);
    //   console.log(polybomu);
    //   console.log(mapglAPI);
    // });
  }, []);
  return (
    <>
      <div id="map-conteiner" style={{ width: '500px', height: '500px' }} />

      {/* //
      {' '}
      <div id="map-conteiner" /> */}
      {/* <script src="https://mapgl.2gis.com/api/js/v1" />
      <script src="https://unpkg.com/@2gis/mapgl-directions@^2/dist/directions.js" /> */}
    </>
  );
}
