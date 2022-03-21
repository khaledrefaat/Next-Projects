import EventsList from '../components/events/events-list';
import { Events } from '../components/events.model';
import { GetStaticProps, NextPage } from 'next';

const HomePage: NextPage<Events> = ({ events }) => {
  return <EventsList events={events} />;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:9000/featured');
  const data = await res.json();
  return {
    props: { events: data },
  };
};
