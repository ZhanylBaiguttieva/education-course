import { Router } from 'express';
import Course from '../models/Course';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Category from '../models/Category';
import mongoose, { mongo, Types } from 'mongoose';
import { imagesUpload } from '../multer';

const coursesRouter = Router();

coursesRouter.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find().populate(
      'category',
      'name');
    return res.send(courses);
  } catch (e) {
    next(e);
  }
});

coursesRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }
    const course = await Course.findById(_id).populate(
      'category');

    if (!course) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(course);
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
        category: req.body.category,
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

coursesRouter.delete('/:id/delete', auth, permit('admin'), async (req, res, next) => {
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

coursesRouter.patch(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      let image: string | undefined | null = undefined;
      if (req.body.image === 'delete') {
        image = null;
      } else if (req.file) {
        image = req.file.filename;
      }
      const result = await Course.updateOne(
        { _id: req.params._id },
        {
          $set: {
            category: req.body.category,
            title: req.body.title,
            price: parseFloat(req.body.price),
            description: req.body.description,
            image: image,
          },
        },
      );

      if (result.matchedCount === 0) {
        return res.status(404).send({ message: 'Not found' });
      }
      return res.send({ message: 'ok!' });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  },
);
export default coursesRouter;