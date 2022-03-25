import { NextApiRequest, NextApiResponse } from 'next';
import Events from '../../data/Events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.json(Events);
  }

  if (req.method === 'POST') {
    const { title, description, location, date, image, isFeatured } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !date ||
      !image ||
      isFeatured === 'undefined'
    ) {
      return res.status(422).json({ msg: 'Invalid inputs.' });
    }
  }
}
