import { useFetchEvent } from 'hooks/useFetchEvent';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const EventDetailsPage = () => {
  const event = useFetchEvent();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {event && (
        <>
          <button
            type="button"
            onClick={() => {
              navigate(location?.state?.from ?? '/');
            }}
          >
            Go back
          </button>
          <h2>{event.name}</h2>
          <img src={event.images[0].url} alt={event.name} width="400" />
          <p>Genre: {event.classifications[0].genre.name}</p>
          <p>SubGenre: {event.classifications[0].subGenre.name}</p>
        </>
      )}
    </>
  );
};
