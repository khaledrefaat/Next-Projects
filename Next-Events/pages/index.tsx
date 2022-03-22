import EventsList from '../components/events/events-list';
import { Events } from '../components/events.model';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage<Events> = ({ events }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Find A lot of great events that will make you evolve"
        />
        <title>Home</title>
      </Head>
      <EventsList events={events} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:9000/featured');
  const data = await res.json();
  return {
    props: { events: data },
  };
};
