import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Route from './Route';

export default function MyRoutes({ currUser }) {
  const navigate = useNavigate();
  const [myRoutes, setMyRoutes] = useState([]);
  useEffect(() => {
    if (myRoutes.length < 1) {
      fetch('/api/v1/myRoutes')
        .then((res) => res.json())
        .then((myRoutesArr) => setMyRoutes(myRoutesArr));
    }
  }, []);
  return (
    <>
      <Row xs={1} md={3} className="g-4">
        {myRoutes?.map((el) => <Route currUser={currUser} key={el.id} route={el} />)}
      </Row>
      <Link to="/newRoute">
        <button>Создать новый маршрут</button>
        {' '}
      </Link>
    </>
  );
}

// <div>У вас не создано ни одного маршрута 😞. Может быть пора создать свой маршрут? 😃</div>
