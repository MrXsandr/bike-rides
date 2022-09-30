import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRoute({ currUser }) {
  const navigate = useNavigate();
  const [newRoute, setNewRoute] = useState({});

  // const { route } = useParams();

  const inputHandler = (e) => {
    setNewRoute((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/v1/newRoute', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newRoute),
    })
      .then(navigate('/myRoutes'));
  };

  return (
    <>
      <h3 style={{
        color: '#A2B4AC', marginTop: '20px', marginBottom: '10px',
      }}
      >
        Добавьте новый маршрут ...

      </h3>

      { currUser.id ? (

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <form method="post" onSubmit={submitHandler}>
            <label htmlFor="title-input" className="block mar-b-1">
              Название маршрута:
              <input
                id="title-input"
                onChange={inputHandler}
                value={newRoute.title || ''}
                name="title"
                type="text"
                className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
              />
            </label>

            <label htmlFor="body-textarea" className="block mar-b-1">
              Длина маршрута:
              <textarea
                onChange={inputHandler}
                value={newRoute.length || ''}
                id="body-textarea"
                name="length"
                type="text"
                className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
              />
            </label>

            <label htmlFor="body-textarea" className="block mar-b-1">
              Населенный пункт:
              <textarea
                onChange={inputHandler}
                value={newRoute.city || ''}
                id="body-textarea"
                name="city"
                type="text"
                className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
              />
            </label>

            <input
              onChange={inputHandler}
              type="submit"
              value="Опубликовать маршрут"
              className="block button w-100 mar-t-4 mar-b-3 pad-2 round-1 text-c center no-border no-outline"
            />
          </form>
        </div>

      )
        : (<div>You are not authorized</div>)}

    </>
  );
}
