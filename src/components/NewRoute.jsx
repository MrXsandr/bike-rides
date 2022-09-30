import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { load } from '@2gis/mapgl';

export default function NewRoute({ currUser }) {
  const navigate = useNavigate();
  const [newRoute, setNewRoute] = useState({});
  const [firstPoint, setFirstPoint] = useState([]);
  const [secondPoint, setSecondPoint] = useState([]);

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
      body: JSON.stringify({
        ...newRoute,
        startX: firstPoint[0],
        startY: firstPoint[1],
        endX: secondPoint[0],
        endY: secondPoint[1],

      }),
    })
      .then(navigate('/myRoutes'));
  };

  const markers = [];

  // let firstPoint;
  // let secondPoint;
  const desperation = async () => {
    const mapglAPI = await load();
    const map = new mapglAPI.Map('map-conteiner', {
      center: [37.66, 55.76],
      zoom: 10,
      key: 'd73d7bb4-4ee2-4388-b740-33bf53a2c2a7',
    });

    let selecting = 'a';
    const buttonText = ['Choose two points on the map', 'Reset points'];
    const controlsHtml = `<button id="reset" disabled>${buttonText[0]}</button> `;
    if (mapglAPI) {
      new mapglAPI.Control(map, controlsHtml, {
        position: 'topLeft',
      });
    }
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function () {
      selecting = 'a';
      setFirstPoint([]);
      setSecondPoint([]);
      markers.forEach((m) => {
        m.destroy();
      });
      this.disabled = true;
      this.textContent = buttonText[0];
    });
    map.on('click', (e) => {
      const coords = e.lngLat;
      if (selecting != 'end') {
        markers.push(
          new mapglAPI.Marker(map, {
            coordinates: coords,
            icon: 'https://docs.2gis.com/img/dotMarker.svg',
          }),
        );
      }
      if (selecting === 'a') {
        setFirstPoint(coords);
        selecting = 'b';
      } else if (selecting === 'b') {
        setSecondPoint(coords);
        selecting = 'end';
      }

      if (firstPoint && secondPoint) {
        console.log('обе точки-------', firstPoint, secondPoint);
        resetButton.disabled = false;
        resetButton.textContent = buttonText[1];
      }
    });
  };
  useEffect(() => {
    desperation();
  }, []);

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
            <div id="map-conteiner" style={{ width: '500px', height: '500px' }} />

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
            <input
              id="title-input"
              onChange={inputHandler}
              value={firstPoint[0] || newRoute.startX}
              name="startX"
              type="text"
              className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
            />
            <input
              id="title-input"
              onChange={inputHandler}
              value={firstPoint[1] || newRoute.startY}
              name="startY"
              type="text"
              className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
            />
            <input
              id="title-input"
              onChange={inputHandler}
              value={secondPoint[0] || newRoute.endX}
              name="endX"
              type="text"
              className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
            />
            <input
              id="title-input"
              onChange={inputHandler}
              value={secondPoint[1] || newRoute.endY}
              name="endY"
              type="text"
              className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
            />
            {/* {secondPoint[0] ? (
              <>
                {console.log(secondPoint)}
                <input
                  id="title-input"
                  onChange={inputHandler}
                  value={firstPoint[0] || ''}
                  name="startX"
                  type="text"
                  className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
                />
                <input
                  id="title-input"
                  onChange={inputHandler}
                  value={firstPoint[1] || ''}
                  name="startY"
                  type="text"
                  className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
                />
                <input
                  id="title-input"
                  onChange={inputHandler}
                  value={secondPoint[0] || ''}
                  name="endX"
                  type="text"
                  className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
                />
                <input
                  id="title-input"
                  onChange={inputHandler}
                  value={secondPoint[1] || ''}
                  name="endY"
                  type="text"
                  className="block w-100 h-10 no-resize no-outline no-border no-resize pad-1 mar-b-2"
                />
              </>
            ) : (<div />) } */}

          </form>
        </div>

      )
        : (<div>You are not authorized</div>)}

    </>
  );
}
