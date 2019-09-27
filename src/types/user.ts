import joi from 'joi';

export const loginDto = joi
  .object({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  })
  .required();

export const registerDto = joi
  .object({
    email: joi
      .string()
      .email()
      .required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    password: joi.string().required()
  })
  .required();

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisteredUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type RegisterDTO = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
