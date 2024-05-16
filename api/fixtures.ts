import mongoose from 'mongoose';
import User from './models/User';
import config from './config';
import Category from './models/Category';
import Course from './models/Course';

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

  const categories = await Category.create(
    {
      name: 'Для младших классов',
    },
    {
      name: 'Для средних классов',
    },
    {
      name: 'Для старших классов',
    },
  );

  await Course.create(
    {
      category: categories[0]._id,
      title: 'Математика 1-3 класс',
      price: 500,
      image: 'fixtures/images/math3.png',
    },
    {
      category: categories[1]._id,
      title: 'Геометрия 5  класс',
      price: 800,
      description: 'В программму курса входят начальные геометрические понятия. ' +
        'Точки, прямые, лучи и отрезки. Также обучаем фигурам и основным формулам.',
      image: 'fixtures/images/geom5.png',
    },
    {
      category: categories[2]._id,
      title: 'Физика 11 класс',
      price: 1000,
      description: "В 11 классе изучаются: электродинамика (окончание), оптика, квантовая физика и элементы астрофизики, методы научного познания. ",
      image: 'fixtures/images/phiz11.png',
    },
  );

  await db.close();
};

void run();