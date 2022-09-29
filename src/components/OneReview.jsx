import React from 'react';
import Card from 'react-bootstrap/Card';

export default function OneReview({ review }) {
  return (
    <li className="entry-item pad-b-4">
      <Card>
        <p className="entry-stub">
          {review.title}
        </p>
        <p className="entry-stub">{review.text}</p>
      </Card>
    </li>
  );
}
