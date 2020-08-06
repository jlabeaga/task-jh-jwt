import { Moment } from 'moment';
import { IAction } from 'app/shared/model/action.model';
import { IUser } from 'app/core/user/user.model';
import { IResource } from 'app/shared/model/resource.model';
import { ITasklist } from 'app/shared/model/tasklist.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';
import { TaskResult } from 'app/shared/model/enumerations/task-result.model';

export interface ITask {
  id?: number;
  name?: string;
  description?: string;
  dateCreated?: Moment;
  dueDate?: Moment;
  status?: TaskStatus;
  result?: TaskResult;
  estimatedHours?: number;
  actions?: IAction[];
  owner?: IUser;
  resources?: IResource[];
  tasklist?: ITasklist;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public dateCreated?: Moment,
    public dueDate?: Moment,
    public status?: TaskStatus,
    public result?: TaskResult,
    public estimatedHours?: number,
    public actions?: IAction[],
    public owner?: IUser,
    public resources?: IResource[],
    public tasklist?: ITasklist
  ) {}
}
