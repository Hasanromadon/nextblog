import db from '../../../libs/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end(); //not allowed

  const posts = await db('posts');

  res.status(200);
  res.json({
    message: 'posts data',
    data: posts,
  });
}
