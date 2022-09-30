import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddReview({ currUser }) {
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState({});

  const { route } = useParams();

  const inputHandler = (e) => {
    setNewReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`/api/v1/routes/${route}/addReview`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then(navigate(`/${route}`));
  };

  return (
    <>
      <h3 style={{
        color: '#A2B4AC', marginTop: '20px', marginBottom: '10px',
      }}
      >
        Оставьте свой честный отзыв на маршрут ...

      </h3>

      { currUser.id ? (
        <form method="post" onSubmit={submitHandler}>
          <label htmlFor="title-input" className="block mar-b-1">
            Заголовок отзыва:
            <input
              id="title-input"
              onChange={inputHandler}
              value={newReview.title || ''}
              name="title"
              type="text"
              className="block w-100 no-outline no-border pad-1 mar-b-2"
            />
          </label>

          <label htmlFor="body-textarea" className="block mar-b-1">
            Развернутый отзыв:
            <textarea
              onChange={inputHandler}
              value={newReview.text || ''}
              id="body-textarea"
              name="text"
              className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
            />
          </label>

          <input
            onChange={inputHandler}
            type="submit"
            value="Опубликовать отзыв"
            className="block button w-100 mar-t-4 mar-b-3 pad-2 round-1 text-c center no-border no-outline"
          />
        </form>
      )
        : (<div>You are not authorized</div>)}

    </>
  );
}
