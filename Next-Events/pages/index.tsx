import EventsList from '../components/events/events-list';
import { getFeaturedEvents } from '../DUMMY_CONTENT';

const HomePage = () => {
  return (
    <main>
      <EventsList events={getFeaturedEvents()} />
    </main>
  );
};

export default HomePage;
