import { NextApiRequest, NextApiResponse } from 'next';
import Events from '../../../data/Events';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const events = Events.filter(event => event.isFeatured);
    return res.json(events);
  }
}
