import { Router } from 'express';
import Category from '../models/Category';
import mongoose, { mongo } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Course from '../models/Course';
import coursesRouter from './courses';

const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.post(
  '/',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const categoryData = {
        name: req.body.name,
      };

      const category = new Category(categoryData);

      await category.save();
      return res.send(category);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      if (e instanceof mongo.MongoServerError && e.code === 11000) {
        return res.status(422).send({ message: 'Title should be unique' });
      }

      next(e);
    }
  },
);

categoriesRouter.delete('/:id/delete', auth, permit('admin'), async (req, res, next) => {
  try {
    const _id = req.params.id;
    const category = await Category.findByIdAndDelete(_id);
    if (!category) {
      return res.status(404).send({ message: 'Категория не найдена' });
    }
    return res.send({ message: 'Категория успешно удалена', category });
  } catch (e) {
    next(e);
  }
});
export default categoriesRouter;
