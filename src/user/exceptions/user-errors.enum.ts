export enum UserErrorsEnum {
  EmailAlreadyUsed = 'Usser-001',
  UserNotFound = 'User-002',
}

export const USER_ERRORS_ENUM_TITLES = {
  [UserErrorsEnum.EmailAlreadyUsed]: 'ERR_USER_EMAIL_EXISTS',
  [UserErrorsEnum.UserNotFound]: 'ERR_USER_NOT_FOUND',
};
