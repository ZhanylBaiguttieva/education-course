import mongoose, { Schema, Types } from 'mongoose';
import Course from './Course';
import User from './User';

const CourseHistorySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const course = await Course.findById(value);
        return Boolean(course);
      },
      message: 'Course does not exist',
    },
  },

  // status: {
  //   type: String,
  //   required: true,
  //   enum: ['Оплачен', 'Не оплачен' ],
  // },
});

const CourseHistory = mongoose.model('CourseHistory', CourseHistorySchema);

export default CourseHistory;