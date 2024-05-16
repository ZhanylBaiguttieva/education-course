import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import CourseHistory from '../models/CourseHistory';
import { Types } from 'mongoose';
import Course from '../models/Course';

const courseHistoriesRouter = Router();
interface CourseListened {
  _id: string;
  course: {
    _id: string;
    title: string;
  };
  user: string;
}
courseHistoriesRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const coursesListened = await CourseHistory.find<CourseListened>({
      user: req.user?._id,
    })
      .populate('course', 'title');

    const convertedCourses: CourseListened[] = coursesListened.map(
      (courseListened) => ({
        _id: courseListened._id,
        course: courseListened.course,
        user: courseListened.user,
      }),
    );

    res.send(convertedCourses);
  } catch (e) {
    next(e);
  }
});

courseHistoriesRouter.post(
  '/',
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.body._id);
      } catch {
        return res.status(404).send({ error: 'Wrong ObjectId!' });
      }

      const course = await Course.findById(_id);
      const courseHistory = new CourseHistory({
        user: req.user?._id,
        course: _id,
      });

      await courseHistory.save();
      return res.send({ courseHistory });
    } catch (e) {
      next(e);
    }
  },
);

export default courseHistoriesRouter;