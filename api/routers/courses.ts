import { Router } from 'express';
import Course from '../models/Course';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Category from '../models/Category';
import mongoose, { mongo } from 'mongoose';
import { imagesUpload } from '../multer';

const coursesRouter = Router();

coursesRouter.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    return res.send(courses);
  } catch (e) {
    next(e);
  }
});

coursesRouter.get('/:id', async (req, res, next) => {
  try {
    const params = req.params.id;
    const course = await Course.findById(params);
    return res.send({ message: 'Поиск по 1 курсу:', course });
  } catch (e) {
    next(e);
  }
});

coursesRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const courseData = {
        category: Category,
        title: req.body.title,
        price: parseFloat(req.body.price),
        description: req.body.description,
        image:  req.file ? req.file.filename : null,
      };

      const course = new Course(courseData);

      await course.save();
      return res.send(course);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

coursesRouter.delete('/:id/delete', auth, permit('super'), async (req, res, next) => {
  try {
    const _id = req.params.id;
    const course = await Course.findByIdAndDelete(_id);
    if (!course) {
      return res.status(404).send({ message: 'Курс не найден' });
    }
    return res.send({ message: 'Курс успешно удален', course });
  } catch (e) {
    next(e);
  }
});
export default coursesRouter;