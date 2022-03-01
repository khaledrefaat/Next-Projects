import { useRouter } from 'next/router';
import { getEventById } from '../../DUMMY_CONTENT';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId);

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
