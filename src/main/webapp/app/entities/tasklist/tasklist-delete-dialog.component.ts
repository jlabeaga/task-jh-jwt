import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITasklist } from 'app/shared/model/tasklist.model';
import { TasklistService } from './tasklist.service';

@Component({
  templateUrl: './tasklist-delete-dialog.component.html',
})
export class TasklistDeleteDialogComponent {
  tasklist?: ITasklist;

  constructor(protected tasklistService: TasklistService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tasklistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tasklistListModification');
      this.activeModal.close();
    });
  }
}
