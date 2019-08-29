import { UserService } from './../services';
import { IUser } from './../models/user';

interface IGetUserByTwitterScreenNameCall {
  request: {
    screenname: string;
  };
}

interface IGetUsersByIdsCall {
  request: {
    userIds: number[];
  };
}

export default {
  async GetUserByTwitterScreenName(call: IGetUserByTwitterScreenNameCall, callback: (err: null, result: {user: IUser}) => void ) {
    const screenname = call.request.screenname;
    let user = await UserService.getByTwitterScreenName(screenname);
    if (!user) {
      user = {
        id: 0,
        name: '',
        username: '',
        avatar: '',
        twitterHandle: '',
        twitterVerified: false,
        timeZone: '',
      };
    }
    callback(null, { user });
  },
  async GetUsersByIds(call: IGetUsersByIdsCall, callback: (err: null, result: {users: IUser[]}) => void) {
    const userIds = call.request.userIds;
    const users = await UserService.getByIds(userIds, []);
    callback(null, { users });
  },
};
