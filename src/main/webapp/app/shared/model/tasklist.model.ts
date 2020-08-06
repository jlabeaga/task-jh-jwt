import { ITask } from 'app/shared/model/task.model';
import { IUser } from 'app/core/user/user.model';

export interface ITasklist {
  id?: number;
  name?: string;
  description?: string;
  tasks?: ITask[];
  participants?: IUser[];
}

export class Tasklist implements ITasklist {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public tasks?: ITask[],
    public participants?: IUser[]
  ) {}
}
