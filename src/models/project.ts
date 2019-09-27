import { arrayProp, prop, Typegoose, Ref } from '@hasezoey/typegoose';
import { TodoModel } from './todo';
import { UserModel } from './user';

export class ProjectModel extends Typegoose {
  @prop({ required: true }) public title!: string;
  @arrayProp({ itemsRef: TodoModel, required: true, default: [] }) public todos!: Ref<TodoModel>[];

  @prop({ ref: UserModel, required: true }) public user!: Ref<UserModel>;
}

export const Project = new ProjectModel().getModelForClass(ProjectModel, { schemaOptions: { timestamps: true } });
