import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

interface EventDetailProps {
  event: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
  };
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  console.log(event);
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

export async function getServerSideProps({ params, req, res }) {
  const response = await fetch(`http://localhost:9000/event/${params.eventId}`);

  if (!response.ok) {
    res.writeHead(302, {
      location: '/events',
    });
    res.end();
    return { props: {} };
  }

  const data = await response.json();
  return { props: { event: data } };
}
