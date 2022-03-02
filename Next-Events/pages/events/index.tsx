import { useRouter } from 'next/router';
import EventsList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../DUMMY_CONTENT';

const Event: React.FC = () => {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList events={events} />;
    </>
  );
};

export default Event;
