import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITasklist, Tasklist } from 'app/shared/model/tasklist.model';
import { TasklistService } from './tasklist.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-tasklist-update',
  templateUrl: './tasklist-update.component.html',
})
export class TasklistUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    participants: [],
  });

  constructor(
    protected tasklistService: TasklistService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tasklist }) => {
      this.updateForm(tasklist);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(tasklist: ITasklist): void {
    this.editForm.patchValue({
      id: tasklist.id,
      name: tasklist.name,
      description: tasklist.description,
      participants: tasklist.participants,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tasklist = this.createFromForm();
    if (tasklist.id !== undefined) {
      this.subscribeToSaveResponse(this.tasklistService.update(tasklist));
    } else {
      this.subscribeToSaveResponse(this.tasklistService.create(tasklist));
    }
  }

  private createFromForm(): ITasklist {
    return {
      ...new Tasklist(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      participants: this.editForm.get(['participants'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITasklist>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }

  getSelected(selectedVals: IUser[], option: IUser): IUser {
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
