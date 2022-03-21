import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';

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
  const fetcher: Fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      const errorInfo = { info: await res.json(), status: res.status };
      Object.assign(error, errorInfo);
      throw error;
    }
    return await res.json();
  };

  const response = useSWR('http://localhost:9000', fetcher);
  const data = response.data as Event[];

  if (!data) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (response.error) {
    return (
      <div>
        <h2>Something went wrong please try again later</h2>
      </div>
    );
  }

  return (
    <ul>
      {data.map((event: Event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </ul>
  );
};

export default LastSales;
