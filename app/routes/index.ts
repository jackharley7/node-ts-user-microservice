import * as Router from 'koa-router';

import UserRoutes from './user.routes';
import SignupRoutes from './signup.routes';
import ProfileRoutes from './profile.routes';

export default (route: Router) => {
  UserRoutes(route);
  SignupRoutes(route);
  ProfileRoutes(route);
};
