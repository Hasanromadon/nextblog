import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';
export default async function handler(req, res) {
  const auth = await authorization(req, res);

  if (req.method !== 'PUT') return res.status(405).end(); //not allowed
  const { id } = req.query;

  const { title, content } = req.body;

  const update = await db('posts').where({ id }).update({
    title,
    content,
  });

  const updatedData = await db('posts').where({ id }).first();
  res.status(200);
  res.json({
    message: 'posts created successfully',
    data: updatedData,
  });
}
