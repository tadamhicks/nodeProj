import { db, genId } from '../../src/modules/db';
const run = async () => {
  await db.post.createMany({
    data: [
      {
        id: genId(),
        slug: 'hello-world',
        title: 'Hello World',
        content: 'Welcome to your new blog!',
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'draft-post',
        title: 'Draft Post'
      },
    ],
  });
};

if (require.main === module) {
  run().then(() => {
    console.log('Seeded database');
    process.exit();
  });
};