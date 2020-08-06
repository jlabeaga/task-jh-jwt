import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAction } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { ActionDeleteDialogComponent } from './action-delete-dialog.component';

@Component({
  selector: 'jhi-action',
  templateUrl: './action.component.html',
})
export class ActionComponent implements OnInit, OnDestroy {
  actions?: IAction[];
  eventSubscriber?: Subscription;

  constructor(protected actionService: ActionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.actionService.query().subscribe((res: HttpResponse<IAction[]>) => (this.actions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActions(): void {
    this.eventSubscriber = this.eventManager.subscribe('actionListModification', () => this.loadAll());
  }

  delete(action: IAction): void {
    const modalRef = this.modalService.open(ActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.action = action;
  }
}
