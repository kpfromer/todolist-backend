import { prop, Typegoose } from '@hasezoey/typegoose';

export class UserModel extends Typegoose {
  @prop({ required: true, unique: true }) public email = '';
  @prop({ required: true }) public firstName = '';
  @prop({ required: true }) public lastName = '';
  @prop({ required: true }) public password = '';
}

export const User = new UserModel().getModelForClass(UserModel, { schemaOptions: { timestamps: true } });
