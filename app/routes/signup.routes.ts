import * as Router from 'koa-router';

import {
  SignupController,
} from '../controllers';

export default (route: Router) => {
  route.post('/signup', SignupController.create);
  route.post('/signup/verify', SignupController.verify);
  route.get('/signup/twitter/token', SignupController.getTwitterRequestToken);
  route.post('/signup/twitter', SignupController.twitterSignup);
};
