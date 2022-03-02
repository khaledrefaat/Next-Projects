import EventsList from '../components/events/events-list';
import { getFeaturedEvents } from '../DUMMY_CONTENT';

const HomePage = () => {
  return <EventsList events={getFeaturedEvents()} />;
};

export default HomePage;
