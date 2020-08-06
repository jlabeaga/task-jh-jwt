import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAction, Action } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { ActionComponent } from './action.component';
import { ActionDetailComponent } from './action-detail.component';
import { ActionUpdateComponent } from './action-update.component';

@Injectable({ providedIn: 'root' })
export class ActionResolve implements Resolve<IAction> {
  constructor(private service: ActionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((action: HttpResponse<Action>) => {
          if (action.body) {
            return of(action.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Action());
  }
}

export const actionRoute: Routes = [
  {
    path: '',
    component: ActionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Actions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActionDetailComponent,
    resolve: {
      action: ActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Actions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActionUpdateComponent,
    resolve: {
      action: ActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Actions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActionUpdateComponent,
    resolve: {
      action: ActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Actions',
    },
    canActivate: [UserRouteAccessService],
  },
];
