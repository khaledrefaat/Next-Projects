import { NextApiRequest, NextApiResponse } from 'next';
import DUMMY_EVENTS from '../../../data/DUMMY_CONTENT';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const events = DUMMY_EVENTS.filter(event => event.isFeatured);
    return res.json(events);
  }
}
