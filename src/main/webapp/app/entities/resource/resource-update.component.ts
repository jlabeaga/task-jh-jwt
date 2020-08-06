import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IResource, Resource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';

@Component({
  selector: 'jhi-resource-update',
  templateUrl: './resource-update.component.html',
})
export class ResourceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    ref: [],
    isGlobal: [],
  });

  constructor(protected resourceService: ResourceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resource }) => {
      this.updateForm(resource);
    });
  }

  updateForm(resource: IResource): void {
    this.editForm.patchValue({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      ref: resource.ref,
      isGlobal: resource.isGlobal,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resource = this.createFromForm();
    if (resource.id !== undefined) {
      this.subscribeToSaveResponse(this.resourceService.update(resource));
    } else {
      this.subscribeToSaveResponse(this.resourceService.create(resource));
    }
  }

  private createFromForm(): IResource {
    return {
      ...new Resource(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      ref: this.editForm.get(['ref'])!.value,
      isGlobal: this.editForm.get(['isGlobal'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResource>>): void {
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
}
