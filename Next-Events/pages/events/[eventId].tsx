import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { Event } from '../../components/events.model';

const EventDetail: React.FC<Event> = ({ event }) => {
  return event ? (
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
  ) : (
    <div></div>
  );
};

export default EventDetail;

export async function getStaticProps(context) {
  const res = await fetch(
    'http://localhost:9000/event/' + context.params.eventId
  );
  const data = await res.json();

  return {
    props: { event: data },
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:9000');
  const events = await res.json();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: false,
  };
}
