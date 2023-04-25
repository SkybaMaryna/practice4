import { useFetchEvent } from 'hooks/useFetchEvent';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const EventsSubPage = () => {
  const event = useFetchEvent();
  const location = useLocation();

  return (
    <>
      {event && (
        <>
          <h2>{event.name}</h2>
          <img src={event.images[0].url} alt={event.name} width="400" />
          <Link state={location.state} to="details">
            More info
          </Link>
        </>
      )}
      ;
    </>
  );
};
