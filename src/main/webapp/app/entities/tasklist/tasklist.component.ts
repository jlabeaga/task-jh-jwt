import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITasklist } from 'app/shared/model/tasklist.model';
import { TasklistService } from './tasklist.service';
import { TasklistDeleteDialogComponent } from './tasklist-delete-dialog.component';

@Component({
  selector: 'jhi-tasklist',
  templateUrl: './tasklist.component.html',
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasklists?: ITasklist[];
  eventSubscriber?: Subscription;

  constructor(protected tasklistService: TasklistService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tasklistService.query().subscribe((res: HttpResponse<ITasklist[]>) => (this.tasklists = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTasklists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITasklist): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTasklists(): void {
    this.eventSubscriber = this.eventManager.subscribe('tasklistListModification', () => this.loadAll());
  }

  delete(tasklist: ITasklist): void {
    const modalRef = this.modalService.open(TasklistDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tasklist = tasklist;
  }
}
