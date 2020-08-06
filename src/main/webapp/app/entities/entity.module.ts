import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.TaskTaskModule),
      },
      {
        path: 'tasklist',
        loadChildren: () => import('./tasklist/tasklist.module').then(m => m.TaskTasklistModule),
      },
      {
        path: 'action',
        loadChildren: () => import('./action/action.module').then(m => m.TaskActionModule),
      },
      {
        path: 'resource',
        loadChildren: () => import('./resource/resource.module').then(m => m.TaskResourceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TaskEntityModule {}
