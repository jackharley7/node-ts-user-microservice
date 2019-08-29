import Profile, { IProfile } from './../models/profile';
/*==============================================================================
  PUBLIC
==============================================================================*/

export const update = async (userId: number, data: IProfile) => {
  await Profile.query()
    .where({userId})
    .patch(data);
  return Profile.query()
    .select('bio', 'website', 'locale', 'countryId', 'regionId', 'postcode')
    .where({userId})
    .first();
};
