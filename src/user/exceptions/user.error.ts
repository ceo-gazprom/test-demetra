import { UserErrorsEnum, USER_ERRORS_ENUM_TITLES } from './user-errors.enum';

export class UserError extends Error {
  public statusCode: UserErrorsEnum;

  constructor(code: UserErrorsEnum, message?: string) {
    super(message || USER_ERRORS_ENUM_TITLES[code]);
    this.statusCode = code;
  }
}
