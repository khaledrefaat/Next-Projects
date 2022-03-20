import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

const LastSales: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:9000', {
          method: 'GET',
        });
        data = await res.json();
        setEvents(data);
        setIsLoading(false);
        setError(false);
      } catch (err) {
        console.log(err);
        setError(true);
        return setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h2>Error</h2>
      </div>
    );
  }
  if (events.length === 0) {
    return (
      <div>
        <h2>No Events Were Found</h2>
      </div>
    );
  }

  return (
    <ul>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </ul>
  );
};

export default LastSales;
