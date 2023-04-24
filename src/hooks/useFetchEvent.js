const { useState, useEffect } = require('react');
const { useParams } = require('react-router-dom');
const { fetchEventById } = require('services/eventsAPI');

export function useFetchEvent() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchEventById(id).then(setEvent);
  }, [id]);

  return event;
}
