import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;
  await client.connect();
  const db = client.db('events');
  const commentCollection = db.collection('comments');

  if (req.method === 'GET') {
    const comments = await commentCollection.find({ event: eventId }).toArray();
    res.status(200).json(comments);
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (!email || !email.includes('@') || !name || !text) {
      return res.status(422).json({ msg: 'Invalid inputs.' });
    }

    try {
      const comment = await commentCollection.insertOne({
        email,
        name,
        text,
        event: eventId,
      });
      client.close();
      res.status(201).json(comment);
    } catch (err) {
      console.log(err);
    }
  }
}
