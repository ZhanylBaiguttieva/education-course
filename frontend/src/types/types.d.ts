export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export  interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Course {
  _id: string;
  category: Category;
  title: string;
  price: number;
  description?: string;
  image: string | null;
}

export interface CourseMutation {
  category: string;
  title: string;
  price: string;
  description?: string;
  image: File | string | null;
}

export interface Category {
  _id: string;
  name: string;
}

export interface UpdateCourseArg {
  courseId: string;
  courseMutation: CourseMutation;
}