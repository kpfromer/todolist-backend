import joi from 'joi';

export const todoDto = joi
  .object({
    title: joi.string().required(),
    completed: joi.boolean(),
    description: joi.string(),
    duedate: joi.date(),
    project: joi.string().required()
  })
  .required();

export type TodoDTO = {
  title: string;
  completed?: boolean;
  description?: string;
  duedate?: Date;
  project: string; // id of project
};

export type CreatedTodoDTO = TodoDTO & {
  _id: string;
};
