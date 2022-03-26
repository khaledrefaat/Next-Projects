import { MongoClient } from 'mongodb';

export default class Newsletter {
  constructor(private email: string) {}

  private client = new MongoClient('mongodb://localhost:27017');
  private db = this.client.db('events');

  async save() {
    await this.client.connect();
    await this.db.collection('newsletter').insertOne({ email: this.email });
    return await this.client.close();
  }
}
