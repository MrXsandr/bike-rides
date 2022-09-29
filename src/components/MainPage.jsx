import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
        <Button className="m-5" variant="outline-success" size="lg">Мои маршруты</Button>
      )
        : (
          <Button className="m-5" variant="outline-success" size="lg">
            <a href="/registration">Зарегистрироваться</a>
            {' '}
          </Button>
        )}

      <Row xs={1} md={3} className="g-4">
        {routes?.map((el) => <Route key={el.id} route={el} />)}
      </Row>

      {/* <Row bg="light" xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col className=" px-4">
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Button variant="primary">
                Информация о маршруте
              </Button>
            </Card>
          </Col>
        ))}
      </Row> */}
    </>
  );
}
