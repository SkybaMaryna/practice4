import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Homepage } from './pages/Homepage';
import { EventsPage } from './pages/EventsPage/EventsPage';
import { EventsSubPage } from './pages/EventsSubPage/EventsSubPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="events" element={<EventsPage />}>
          <Route path=":id" element={<EventsSubPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
