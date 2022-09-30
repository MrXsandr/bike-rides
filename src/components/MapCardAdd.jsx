import React, { useEffect, useState } from 'react';
import { Directions } from '@2gis/mapgl-directions';
import { load } from '@2gis/mapgl';

export default function MapCardAdd({}) {
  const markers = [];
  let firstPoint;
  let secondPoint;
  const desperation = async () => {
    const mapglAPI = await load();
    const map = new mapglAPI.Map('map-conteiner', {
      center: [37.66, 55.76],
      zoom: 10,
      key: 'd73d7bb4-4ee2-4388-b740-33bf53a2c2a7',
    });

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
      this.disabled = true;
      this.textContent = buttonText[0];
    });
    map.on('click', (e) => {
      const coords = e.lngLat;
      if (selecting != 'end') {

        markers.push(
          new mapglAPI.Marker(map, {
            coordinates: coords,
            icon: 'https://docs.2gis.com/img/dotMarker.svg',
          }),
        );
      }
      if (selecting === 'a') {

        firstPoint = coords;
        selecting = 'b';
      } else if (selecting === 'b') {
        secondPoint = coords;
        selecting = 'end';
      }

      if (firstPoint && secondPoint) {
        console.log('обе точки-------', firstPoint, secondPoint);
        resetButton.disabled = false;
        resetButton.textContent = buttonText[1];
      }
    });
  };
  useEffect(() => {
    desperation();
  }, []);
  return (
    <div id="map-conteiner" style={{ width: '500px', height: '500px' }} />
  );
}
