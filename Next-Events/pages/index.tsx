import EventsList from '../components/events/events-list';
import { Events } from '../components/events.model';

const HomePage: React.FC<Events> = ({ events }) => {
  return <EventsList events={events} />;
};

export default HomePage;

export async function getStaticProps() {
  const res = await fetch('http://localhost:9000/featured');
  const data = await res.json();
  console.log(data);
  return {
    props: { events: data },
  };
}
