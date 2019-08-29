'use strict';

import { Model } from 'objection';

export interface IUserTemp {
  id?: number;
  email: string;
  name: string;
  verifyNumber: number;
  timeZone: string;
  createdAt?: string | Date;
}

export default class UserTemp extends Model implements IUserTemp {
  public id?: number;
  public email: string;
  public name: string;
  public verifyNumber: number;
  public verified: boolean;
  public timeZone: string;
  public createdAt?: string | Date;

  static get tableName() {
    return 'UserTemp';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'email',
        'verifyNumber',
      ],
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        verifyNumber: { type: 'integer' },
        verified: { type: 'boolean' },
        timeZone: { type: 'string' },
        createdAt: { type: ['string'] },
      },
    };
  }

}
