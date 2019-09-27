import { prop, Typegoose, Ref, ModelType } from '@hasezoey/typegoose';
import { ProjectModel } from './project';
import { UserModel } from './user';

export class TodoModel extends Typegoose {
  @prop({ required: true }) public title!: string;
  @prop({ default: '' }) public description!: string;
  @prop({ default: false }) public completed!: boolean;
  @prop() public duedate?: Date;
  @prop({ ref: ProjectModel, required: true }) public project!: Ref<ProjectModel>;

  @prop({ ref: UserModel, required: true }) public user!: Ref<UserModel>;
}

export const Todo = new TodoModel().getModelForClass(TodoModel, { schemaOptions: { timestamps: true } });
