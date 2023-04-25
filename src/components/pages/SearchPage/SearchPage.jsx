import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { fetchEventsByName } from 'services/eventsAPI';

export const SearchPage = () => {
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const eventsname = searchParams.get('eventsname');
  const location = useLocation();

  useEffect(() => {
    if (!eventsname) {
      return;
    }
    fetchEventsByName(eventsname).then(setEvents);
  }, [eventsname]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ eventsname: form.elements.eventsname.value });
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="eventsname" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {events.map(({ name, id }) => (
          <li key={id}>
            <Link to={id} state={{ from: location }}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};
