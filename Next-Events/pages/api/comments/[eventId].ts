import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import Comment from '../../../models/comment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

  if (req.method === 'GET') {
    const comments = await Comment.getComments(eventId);

    res.status(200).json(comments);
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (!email || !email.includes('@') || !name || !text) {
      return res.status(422).json({ msg: 'Invalid inputs.' });
    }

    try {
      if (typeof eventId === 'string') {
        const comment = new Comment(email, name, text, eventId);
        await comment.save();
        res.status(201).json({ msg: 'done' });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ msg: 'Something went wrong, please try again later.' });
    }
  }
}
