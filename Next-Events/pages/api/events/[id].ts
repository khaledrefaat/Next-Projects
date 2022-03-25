import { NextApiRequest, NextApiResponse } from 'next';
import Events from '../../../data/Events';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const event = Events.find(event => event.id === id);
    res.json(event);
  }
}
