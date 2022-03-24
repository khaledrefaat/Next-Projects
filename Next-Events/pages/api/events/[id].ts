import { NextApiRequest, NextApiResponse } from 'next';
import DUMMY_EVENTS from '../../../data/DUMMY_CONTENT';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('----------------------------------------------------');
  if (req.method === 'GET') {
    const { id } = req.query;
    const event = DUMMY_EVENTS.find(event => event.id === id);
    console.log(event);
    res.json(event);
  }
}
