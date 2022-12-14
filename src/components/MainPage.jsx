import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Route from './Route';

export default function MainPage({ currUser }) {
  const [routes, setRoutes] = useState([]);
  const deleteHandler = (id) => {
    fetch(`/api/v1/routes/${id}`, {
      method: 'delete',
    })
      .then(() => setRoutes((prev) => prev.filter((el) => el.id !== id)));
  };
  useEffect(() => {
    if (routes.length < 1) {
      fetch('/api/v1/routes')
        .then((res) => res.json())
        .then((routesArr) => setRoutes(routesArr));
    }
  }, [routes]);
  return (
    <>
      {currUser?.id ? (
        <Link to="/myRoutes"><Button className="m-5" variant="outline-success" size="lg">Мои маршруты</Button></Link>
      )
        : (
          <Button className="m-5" variant="outline-success" size="lg">
            <a href="/registration">Зарегистрироваться</a>
            {' '}
          </Button>
        )}

      <Row xs={1} md={3} className="g-4">
        {routes?.map((el) => (
          <Route
            currUser={currUser}
            key={el.id}
            route={el}
            deleteHandler={deleteHandler}
          />
        ))}
      </Row>
    </>
  );
}
