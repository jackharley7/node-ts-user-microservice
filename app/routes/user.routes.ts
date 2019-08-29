import * as Router from 'koa-router';

import {
  UserController,
} from '../controllers';

export default (route: Router) => {
  route.post('/login', UserController.login);
  route.get('/username/:username', UserController.checkForUsername);
  route.post('/user', UserController.create);
  route.post('/user/:userId/changepassword', UserController.changePassword);
  route.post('/user/:userId/changepasswordfromtemp', UserController.changePasswordFromTemp);
  route.post('/user/requestpasswordreset', UserController.requestPasswordReset);
  route.get('/user', UserController.search);
  route.get('/user/ids/:ids', UserController.getByIds);
  route.get('/user/:userId', UserController.get);
  route.patch('/user/:userId', UserController.update);
  route.delete('/user/:userId', UserController.suspend);
  route.get('/user/:userId/upload/avatar', UserController.getPreSignedAvatarUrl);
  route.patch('/user/:userId/twitter/link', UserController.twitterLinkProfile);
  route.patch('/user/:userId/twitter/unlink', UserController.twitterUnlinkProfile);

  route.get('/twitter/user', UserController.getTwitterProfileByScreenName);
};
