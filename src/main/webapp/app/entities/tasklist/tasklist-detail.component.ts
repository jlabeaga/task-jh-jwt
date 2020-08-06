import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITasklist } from 'app/shared/model/tasklist.model';

@Component({
  selector: 'jhi-tasklist-detail',
  templateUrl: './tasklist-detail.component.html',
})
export class TasklistDetailComponent implements OnInit {
  tasklist: ITasklist | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tasklist }) => (this.tasklist = tasklist));
  }

  previousState(): void {
    window.history.back();
  }
}
