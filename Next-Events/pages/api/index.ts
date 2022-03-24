import { NextApiRequest, NextApiResponse } from 'next';
import DUMMY_EVENTS from '../../data/DUMMY_CONTENT';

// router.get('/filter/:year/:month', (req, res, next) => {
//   const { year, month } = req.params;
//   let filteredEvents = DUMMY_EVENTS.filter(event => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
//     );
//   });
//   res.json(filteredEvents);
// });

// module.exports = router;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.json(DUMMY_EVENTS);
  }
}
