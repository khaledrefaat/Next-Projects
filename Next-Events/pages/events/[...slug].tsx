import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Events } from '../../components/events.model';
import EventsList from '../../components/events/events-list';
import Spinner from '../../components/Ui/Spinner';

const FilteredEvents: React.FC<Events> = ({ events }) => {
  const router = useRouter();
  const filterData = router.query.slug;

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`a list of filtered events`} />
    </Head>
  );

  if (!events || !filterData) {
    return (
      <>
        {pageHeadData}
        <Spinner />
      </>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`filtered events for ${filterData[0]}/${filterData[1]}`}
      />
    </Head>
  );

  if (events.length < 1) {
    return (
      <div>
        {pageHeadData}
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          No events were found.
        </h1>
      </div>
    );
  }

  return (
    <>
      {pageHeadData}
      <EventsList events={events} />
    </>
  );
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
    `http://localhost:3000/api/events/${slug[0]}/${slug[1]}`
  );
  const data = await response.json();

  return { props: { events: data } };
};
