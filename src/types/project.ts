import joi from 'joi';

export const projectDto = joi
  .object({
    title: joi.string().required()
  })
  .required();

export type ProjectDTO = {
  title: string;
  // TODO: todos
  // todos?: string[];
};

export type CreatedProjectDTO = ProjectDTO & {
  _id: string;
  todos: string[];
};
