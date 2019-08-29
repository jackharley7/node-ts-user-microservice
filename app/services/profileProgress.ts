import { get } from './user.service';
import { update } from './profile.service';
import { IUser } from './../models/user';

const userFields = [
  { name: 'avatar', score: 30 },
  { name: 'name', score: 15 },
  { name: 'twitterHandle', score: 25 },
];

const profileFields = [
  { name: 'bio', score: 30 },
];

interface IUserIndex extends IUser {
  [key: string]: any;
}

export default async (userId: number) => {
  const user: IUserIndex | undefined = await get(userId, ['profile']);

  if (!user) {
    return;
  }

  let progress: number = 0;
  progress = updateProgress(userFields, user, progress);
  progress = updateProgress(profileFields, user.profile, progress);

  await update(userId, {progress});

  user.profile.progress = progress;

  return user;
};

interface IFields {
  name: string;
  score: number;
}

const updateProgress = (fields: IFields[], user: IUserIndex, progress: number) => (
  fields.reduce((acc: number, val) => {
    if (user[val.name]) {
      return acc + val.score;
    }
    return acc;
  }, progress)
);
