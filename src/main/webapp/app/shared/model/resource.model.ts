import { ITask } from 'app/shared/model/task.model';

export interface IResource {
  id?: number;
  name?: string;
  description?: string;
  ref?: string;
  isGlobal?: boolean;
  tasks?: ITask[];
}

export class Resource implements IResource {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public ref?: string,
    public isGlobal?: boolean,
    public tasks?: ITask[]
  ) {
    this.isGlobal = this.isGlobal || false;
  }
}
