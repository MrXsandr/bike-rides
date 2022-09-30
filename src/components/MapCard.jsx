import React, { useEffect } from 'react';
import { load } from '@2gis/mapgl';

export default function MapCard({}) {
  const firstPoint = [37.62223449719688, 55.72907987721382];
  const secPoint = [37.579662475884135, 55.72366633640476];
  //   const markers = [firstPoint, secPoint];
  const desperation = async () => {
    const mapglAPI = await load();

    // container — id of the div element in your html
    // const map = new mapglAPI.Map('conteiner', {
    //   center: firstPoint,
    //   zoom: 15,
    //   key: 'd73d7bb4-4ee2-4388-b740-33bf53a2c2a7',
    // });
    console.log('ololo')
    const map = await new mapglAPI.Map('conteiner-map', {
      center: firstPoint,
      zoom: 14,
      key: 'd73d7bb4-4ee2-4388-b740-33bf53a2c2a7',
    });
    const firstMarker = await new mapglAPI.Marker(map, {
      coordinates: firstPoint,
      icon: 'https://docs.2gis.com/img/dotMarker.svg',
    });
    const secMarker = await new mapglAPI.Marker(map, {
      coordinates: secPoint,
      icon: 'https://docs.2gis.com/img/dotMarker.svg',
    });
  };
  useEffect(() => {
    desperation();
  }, []);
  return (
    <div id="conteiner-map" style={{ width: '500px', height: '500px', morgen: 'center' }} />

  );
}
