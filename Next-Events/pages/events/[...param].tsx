import { useRouter } from 'next/router';
import EventsList from '../../components/events/events-list';
import { getFilteredEvents } from '../../DUMMY_CONTENT';

const FilteredEvents = () => {
  const generateText = (text: string) => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>{text}</h1>
      </div>
    );
  };

  const router = useRouter();
  const param = router.query.param;

  if (!param) return generateText('...loading');

  const numYear = +param[0];
  const numMonth = +param[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return generateText('Invalid filter, please adjust your values!');
  }

  const events = getFilteredEvents({
    year: +param[0],
    month: +param[1],
  });

  if (!events || events.length < 1)
    return generateText('No events were found.');
  return (
    <>
      <EventsList events={events} />
    </>
  );
};

export default FilteredEvents;
