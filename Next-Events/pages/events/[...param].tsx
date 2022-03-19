import { useRouter } from 'next/router';
import { Events } from '../../components/events.model';
import EventsList from '../../components/events/events-list';

const FilteredEvents: React.FC<Events> = ({ events }) => {
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

  if (events === null) {
    return generateText('Invalid filter, please adjust your values!');
  }

  if (!events || events.length < 1)
    return generateText('No events were found.');
  return (
    <>
      <EventsList events={events} />
    </>
  );
};

export default FilteredEvents;

export async function getServerSideProps({ params, req, res }) {
  const { param } = params;
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
    return { props: { events: null } };
  }

  const response = await fetch(
    `http://localhost:9000/filter/${param[0]}/${param[1]}`
  );
  const data = await response.json();

  return { props: { events: data } };
}
