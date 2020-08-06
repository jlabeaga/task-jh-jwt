import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITasklist } from 'app/shared/model/tasklist.model';

type EntityResponseType = HttpResponse<ITasklist>;
type EntityArrayResponseType = HttpResponse<ITasklist[]>;

@Injectable({ providedIn: 'root' })
export class TasklistService {
  public resourceUrl = SERVER_API_URL + 'api/tasklists';

  constructor(protected http: HttpClient) {}

  create(tasklist: ITasklist): Observable<EntityResponseType> {
    return this.http.post<ITasklist>(this.resourceUrl, tasklist, { observe: 'response' });
  }

  update(tasklist: ITasklist): Observable<EntityResponseType> {
    return this.http.put<ITasklist>(this.resourceUrl, tasklist, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITasklist>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITasklist[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
