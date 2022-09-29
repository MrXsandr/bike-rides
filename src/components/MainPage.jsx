import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function MainPage() {
  return (
    <>
      <div>
        <Button className="m-5" variant="outline-success" size="lg">Мои маршруты</Button>
      </div>
      <Row xs={1} md={2} className="g-4">
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
      </Row>
    </>
  );
}
