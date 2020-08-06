import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaskSharedModule } from 'app/shared/shared.module';
import { TasklistComponent } from './tasklist.component';
import { TasklistDetailComponent } from './tasklist-detail.component';
import { TasklistUpdateComponent } from './tasklist-update.component';
import { TasklistDeleteDialogComponent } from './tasklist-delete-dialog.component';
import { tasklistRoute } from './tasklist.route';

@NgModule({
  imports: [TaskSharedModule, RouterModule.forChild(tasklistRoute)],
  declarations: [TasklistComponent, TasklistDetailComponent, TasklistUpdateComponent, TasklistDeleteDialogComponent],
  entryComponents: [TasklistDeleteDialogComponent],
})
export class TaskTasklistModule {}
