import { ModelType } from '@hasezoey/typegoose';
import { ProjectModel, Project } from '../models/project';
import { CreatedProjectDTO, ProjectDTO } from '../types/project';

export default new (class TodoService {
  private getCreatedProject(project: InstanceType<ModelType<ProjectModel>>): CreatedProjectDTO {
    return {
      _id: project.id,
      title: project.title,
      todos: project.toObject().todos
    };
  }

  async getAll(userId: string): Promise<CreatedProjectDTO[]> {
    const projects = await Project.find({ user: userId }).exec();
    return projects.map(this.getCreatedProject);
  }

  async getById(userId: string, id: string): Promise<CreatedProjectDTO | null> {
    const project = await Project.findOne({ user: userId, id }).exec();
    if (!project) {
      return null;
    }
    return this.getCreatedProject(project);
  }

  async createProject(userId: string, details: ProjectDTO): Promise<CreatedProjectDTO> {
    const project = await Project.create({ ...details, user: userId });
    return this.getCreatedProject(project);
  }

  async updateProject(userId: string, id: string, details: ProjectDTO): Promise<null | CreatedProjectDTO> {
    const project = await Project.findOneAndUpdate({ _id: id, user: userId }, details).exec();
    if (!project) {
      return null;
    }
    return this.getCreatedProject(project);
  }

  async deleteProject(userId: string, id: string): Promise<null | true> {
    const project = await Project.findOneAndDelete({ _id: id, user: userId }).exec();
    if (!project) {
      return null;
    }
    return true;
  }
})();
