import { MongoClient } from 'mongodb';

export default class Comment {
  constructor(
    private email: string,
    private name: string,
    private text: string,
    private eventId: string
  ) {}

  static readonly client = new MongoClient('mongodb://localhost:27017');
  static readonly db = Comment.client.db('events');

  async save() {
    Comment.client.connect();
    await Comment.db.collection('comments').insertOne({
      email: this.email,
      name: this.name,
      text: this.text,
      eventId: this.eventId,
    });
    Comment.client.close();
  }

  static async getComments(eventId) {
    await this.client.connect();
    const comments = await this.db
      .collection('comments')
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray();
    await this.client.close();
    return comments;
  }
}
