'use strict';
import { Context } from 'koa';

export class ErrorMsg extends Error {
  public statusCode: number = 400;

  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, ErrorMsg.prototype);
  }
}

export class ValidationError extends Error {
  public statusCode: number = 400;
  public error: IErrorHash;

  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, ErrorMsg.prototype);
  }
}

export interface IValidationErrorItem {
  message: string;
  keyword: 'required' | 'maxLength';
  params?: any;
}

export interface IErrorHash {
  [columnName: string]: IValidationErrorItem[];
}

export const throwError = (errorMessage: string, statusCode?: number) => {
  const error: ErrorMsg = new ErrorMsg(errorMessage);

  error.statusCode = statusCode || 400;

  throw error;
};

export const handleValidationError = (
  ctx: Context,
  err: Error & { data: {}, code: {} },
  verboseError?: string,
) => {

  if (err.code && err.code === 'ER_DUP_ENTRY') {
    ctx.body = {};
    ctx.status = 409;
    return;
  }

  if (err.data) {
    ctx.body = {
      error: verboseError || 'There was an error processing your request.',
      serverError: err.data,
    };
    ctx.status = 400;
    return;
  }

  throw err;
};

export interface IValidationItem {
  keyword?: 'required' | 'maxLength';
  field: string;
}

export const throwValidationError = (...d: IValidationItem[]) => {
  const error = new ValidationError('manually triggered validation error');

  error.error = {};

  d.map(item => {
    error.error[item.field] = [{
      message: '',
      keyword: item.keyword || 'required',
    }];
  });

  throw error;
};

export const checkForValidationErrors = (fields: any) => {
  const keys = Object.keys(fields);
  const valErrors: any[] = [];

  keys.forEach((key) => {
    if (!fields[key]) {
      valErrors.push({field: key});
    }
  });

  if (!valErrors.length) {
    return;
  }

  throwValidationError(...valErrors);
};
