import mongoose from 'mongoose';
import User from './models/User';
import config from './config';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const collections = ['users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create(
    {
      email: 'user@course.local',
      password: '1qwerty',
      token: crypto.randomUUID(),
      role: 'client',
    },
    {
      email: 'admin@course.local',
      password: '1qwerty',
      token: crypto.randomUUID(),
      role: 'admin',
    },
  );

  await db.close();
};

void run();