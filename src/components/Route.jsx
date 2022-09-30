import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MapCard from './MapCard';

export default function Route({ route, currUser }) {
  const firstPoint = [route.startX, route.startY];
  const secPoint = [route.endX, route.endY];
  return (
    <div className="col-5 mt-4">
      <div className="card">
        {/* <img src="https://new-retail.ru/upload/iblock/884/8845716a3a1fd084a1fd43521dc10f4f.jpg" className="card-img-top" alt="..." /> */}
        <MapCard firstPoint={firstPoint} secPoint={secPoint} />
        <div className="card-body">
          <h5 className="card-title redText">{route.title}</h5>
          <p className="card-text">{route.length}</p>
          <p className="card-text">{route.city}</p>
          <Button className="m-1" variant="outline-success" size="lg">
            <Link to={`/${route.id}`}>Детали</Link>
            {' '}
          </Button>
        </div>
      </div>
    </div>
  );
}
