import express from 'express';
import morgan from 'morgan';
import { db } from './modules/db';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});
app.get('/posts', async (req, res) => {
  const posts = await db.post.findMany({
    where: { publishedAt: { not: null } },
  });
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = await db.post.findUnique({
    where: {
      id: String(id),
      publishedAt: { not: null },
    },
  });
  res.json(post);
});

const port = Number(process.env.PORT || 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening at http://localhost:${port}`);
});
