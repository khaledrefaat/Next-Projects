import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await client.connect();
    const db = await client.db('events');
    const comments = await db.collection('comments').find({}).toArray();
    client.close();
    res.json(comments);
  }
}
