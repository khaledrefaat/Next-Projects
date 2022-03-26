import { NextApiRequest, NextApiResponse } from 'next';
import Newsletter from '../../models/newsletter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(422).json({ msg: 'Invalid inputs.' });
    }

    try {
      await new Newsletter(email).save();
      res.status(201).json({ msg: 'done' });
    } catch (err) {
      console.log(err);
    }
  }
}
