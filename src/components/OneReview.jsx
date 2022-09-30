import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function OneReview({ review }) {
  return (

    <div style={{
      marginTop: '10px', marginBottom: '20px', fontSize: '14px', color: 'chocolate',
    }}
    >
      <span>{review.text}</span>
    </div>
  );
}
