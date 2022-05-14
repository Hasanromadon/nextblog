import db from '../../../../libs/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end(); //not allowed
  const { id } = req.query;

  await db('posts').where({ id }).del();

  res.status(200);
  res.json({
    message: 'posts delete successfully',
  });
}
