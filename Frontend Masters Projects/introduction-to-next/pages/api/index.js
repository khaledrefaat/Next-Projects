import nc from 'next-connect';

const handler = nc().get((req, res) => {
  res.json({ message: 'Hello There.' });
});

export default handler;
