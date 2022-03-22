import { useRouter } from 'next/router';
import EventsList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';
import { Events } from '../../components/events.model';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

const Event: NextPage<Events> = ({ events }) => {
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList events={events} />;
    </>
  );
};

export default Event;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:9000');
  const data = await res.json();
  return { props: { events: data }, revalidate: 600 /* 10minuets */ };
};
