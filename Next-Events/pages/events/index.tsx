import { useRouter } from 'next/router';
import EventsList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';
import { Events } from '../../components/events.model';

const Event: React.FC<Events> = ({ events }) => {
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

export async function getStaticProps() {
  const res = await fetch('http://localhost:9000');
  const data = await res.json();
  return { props: { events: data } };
}
