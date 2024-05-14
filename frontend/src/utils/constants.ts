export const apiURL = 'http://localhost:8000';

export const serverRoute = {
  users: '/users',
  sessions: '/users/sessions',
};

export const Roles = [
  { id: 1, name: 'admin' },
  { id: 3, name: 'client' },
];

export const appRoutes = {
  notFound: '*',
  home: '/',
  register: '/register',
  login: '/login',
};