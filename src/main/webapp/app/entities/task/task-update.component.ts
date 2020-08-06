import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource/resource.service';
import { ITasklist } from 'app/shared/model/tasklist.model';
import { TasklistService } from 'app/entities/tasklist/tasklist.service';

type SelectableEntity = IUser | IResource | ITasklist;

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html',
})
export class TaskUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  resources: IResource[] = [];
  tasklists: ITasklist[] = [];
  dateCreatedDp: any;
  dueDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    dateCreated: [null, [Validators.required]],
    dueDate: [],
    status: [null, [Validators.required]],
    result: [null, [Validators.required]],
    estimatedHours: [],
    owner: [],
    resources: [],
    tasklist: [],
  });

  constructor(
    protected taskService: TaskService,
    protected userService: UserService,
    protected resourceService: ResourceService,
    protected tasklistService: TasklistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.resourceService.query().subscribe((res: HttpResponse<IResource[]>) => (this.resources = res.body || []));

      this.tasklistService.query().subscribe((res: HttpResponse<ITasklist[]>) => (this.tasklists = res.body || []));
    });
  }

  updateForm(task: ITask): void {
    this.editForm.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      dateCreated: task.dateCreated,
      dueDate: task.dueDate,
      status: task.status,
      result: task.result,
      estimatedHours: task.estimatedHours,
      owner: task.owner,
      resources: task.resources,
      tasklist: task.tasklist,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    return {
      ...new Task(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value,
      dueDate: this.editForm.get(['dueDate'])!.value,
      status: this.editForm.get(['status'])!.value,
      result: this.editForm.get(['result'])!.value,
      estimatedHours: this.editForm.get(['estimatedHours'])!.value,
      owner: this.editForm.get(['owner'])!.value,
      resources: this.editForm.get(['resources'])!.value,
      tasklist: this.editForm.get(['tasklist'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IResource[], option: IResource): IResource {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
