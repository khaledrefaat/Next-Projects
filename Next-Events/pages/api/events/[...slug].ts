import { NextApiRequest, NextApiResponse } from 'next';
import DUMMY_EVENTS from '../../../data/DUMMY_CONTENT';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const numYear = +slug[0];
  const numMonth = +slug[1];
  console.log(slug);
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
  if (req.method === 'GET') {
    let filteredEvents = DUMMY_EVENTS.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      );
    });
    res.json(filteredEvents);
  }
}
