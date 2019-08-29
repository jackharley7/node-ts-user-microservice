import * as Router from 'koa-router';

import {
  ProfileController,
} from '../controllers';

export default (route: Router) => {
  route.patch('/user/:userId/profile', ProfileController.update);
};
