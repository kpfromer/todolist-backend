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
