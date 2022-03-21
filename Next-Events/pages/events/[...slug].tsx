import { GetServerSideProps } from 'next';
import { Events } from '../../components/events.model';
import EventsList from '../../components/events/events-list';
import Spinner from '../../components/Ui/Spinner';

const FilteredEvents: React.FC<Events> = ({ events }) => {
  if (!events) {
    return <Spinner />;
  }

  if (events.length < 1) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          No events were found.
        </h1>
      </div>
    );
  }

  return <EventsList events={events} />;
};

export default FilteredEvents;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  const numYear = +slug[0];
  const numMonth = +slug[1];
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return { notFound: true };
  }

  const response = await fetch(
    `http://localhost:9000/filter/${slug[0]}/${slug[1]}`
  );
  const data = await response.json();

  return { props: { events: data } };
};
