import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Reviews from './Reviews';

export default function OneRoute({ route, currUser }) {
  const { routeId } = useParams();
  const [oneRoute, setOneRoute] = useState([]);
  useEffect(() => {
    if (oneRoute.length < 1) {
      fetch(`/api/v1/routes/${routeId}`)
        .then((res) => res.json())
        .then((data) => setOneRoute(data));
    }
  }, []);

  const [addedReview, setAddedReview] = useState('');

  useEffect(() => {
    fetch(`/api/v1/routes/${routeId}`)
      .then((res) => res.json())
      .then((data) => setAddedReview(data));
  }, []);

  return (
    <div>
      <img style={{ width: '600px', margin: '20px 0px' }} src="https://russia-travel-tips.com/wp-content/uploads/2020/03/plan-de-moscou-avec-monuments.jpg" />
      <h5>
        Название:
        {' '}
        {oneRoute.title}
      </h5>
      <h5>
        Длина маршрута:
        {' '}
        {oneRoute.length}
      </h5>
      <h5>
        Населенный пункт:
        {' '}
        {oneRoute.city}
      </h5>

      {currUser?.id && <Link to={`/${routeId}/newReview`} params={{ routeId, currUser }}><button type="submit">Добавить отзыв</button></Link> }

      <h1 style={{
        color: '#A2B4AC', marginTop: '20px', marginBottom: '10px',
      }}
      >
        Отзывы о маршруте
      </h1>
      <Reviews routeId={routeId} />
    </div>
  );
}

// WHY routeId != oneRoute.id ???
