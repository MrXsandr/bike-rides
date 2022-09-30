import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Route from './Route';

export default function MainPage({ currUser }) {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    if (routes.length < 1) {
      fetch('/api/v1/routes')
        .then((res) => res.json())
        .then((routesArr) => setRoutes(routesArr));
    }
  }, []);
  return (
    <>
      {currUser?.id ? (
        <Button className="m-5" variant="outline-warning" size="lg">Мои маршруты</Button>
      )
        : (
          <Button className="m-5" variant="outline-warning" size="lg" href="/registration">
            Зарегистрироваться
            {' '}
          </Button>
        )}

      <Row xs={1} md={3} className="g-4">
        {routes?.map((el) => <Route key={el.id} route={el} />)}
      </Row>

    </>
  );
}
