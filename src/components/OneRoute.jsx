import React, { useState, useEffect, useCallback } from 'react';
// import React from "https://cdn.skypack.dev/react";
import { useParams, useNavigate } from 'react-router-dom';
import Registration from './Registration';
import Reviews from './Reviews';
import Route from './Route';

export default function OneRoute({ route }) {
  const { routeId } = useParams();
  const [oneRoute, setOneRoute] = useState([]);
  useEffect(() => {
    if (oneRoute.length < 1) {
      fetch(`/api/v1/routes/${routeId}`)
        .then((res) => res.json())
        .then((data) => setOneRoute(data));
    }
  }, []);

  return (
    <div>
      <img style={{ width: '600px', margin: '20px 0px' }} src="https://russia-travel-tips.com/wp-content/uploads/2020/03/plan-de-moscou-avec-monuments.jpg" />
      <h4>
        Название:
        {' '}
        {oneRoute.title}
      </h4>
      <h4>
        Длина маршрута:
        {' '}
        {oneRoute.length}
      </h4>
      <h4>
        Населенный пункт:
        {' '}
        {oneRoute.city}
      </h4>
      <h1 style={{
        color: '#A2B4AC', marginTop: '20px', marginBottom: '20px',
      }}
      >
        Отзывы о маршруте
      </h1>

      <Reviews routeId={oneRoute.id} />
    </div>
  );
}
