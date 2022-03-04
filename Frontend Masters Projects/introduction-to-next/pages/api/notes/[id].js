// pages/api/note/index.js
import nc from 'next-connect';
import notes from '../../../src/data/data';

const handler = nc().get((req, res) => {
  //   console.log(req.query.id);
  const note = notes.find(note => {
    return note.id.toString() == req.query.id.toString();
  });
  console.log(note);
  res.json({ data: note });
});
export default handler;
