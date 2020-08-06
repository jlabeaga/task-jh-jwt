import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITask } from 'app/shared/model/task.model';

export interface IAction {
  id?: number;
  name?: string;
  description?: string;
  dateCreated?: Moment;
  hours?: number;
  owner?: IUser;
  task?: ITask;
}

export class Action implements IAction {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public dateCreated?: Moment,
    public hours?: number,
    public owner?: IUser,
    public task?: ITask
  ) {}
}
