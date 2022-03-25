import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(422).json({ msg: 'Invalid inputs.' });
    }
    res.status(201).json({ msg: 'done' });
  }
}
