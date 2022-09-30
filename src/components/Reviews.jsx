import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OneReview from './OneReview';

export default function Reviews({ currUser, routeId }) {
  const [reviewsArr, setReviewsArr] = useState([]);
  useEffect(() => {
    fetch(`/api/v1/routes/${routeId}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviewsArr(data));
  }, []);
  return (
    <main role="main">
      <ul>
        {reviewsArr?.map((el) => <OneReview key={el.id} review={el} />)}
      </ul>
    </main>
  );
}
