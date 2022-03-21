import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { Event } from '../../components/events.model';
import { GetStaticPaths, NextPage } from 'next';
import Spinner from '../../components/Ui/Spinner';

const EventDetail: NextPage<Event> = ({ event }) => {
  if (!event) {
    return <Spinner />;
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetail;

export async function getStaticProps(context) {
  let data;
  try {
    const res = await fetch(
      'http://localhost:9000/event/' + context.params.eventId
    );
    data = await res.json();
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }

  if (!data) return { notFound: true };

  return {
    props: { event: data },
    revalidate: 60,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  // just preRender the featured events it would be overkill to render every event
  const res = await fetch('http://localhost:9000/featured');
  const events = await res.json();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
};
