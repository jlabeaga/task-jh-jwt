import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaskTestModule } from '../../../test.module';
import { TasklistComponent } from 'app/entities/tasklist/tasklist.component';
import { TasklistService } from 'app/entities/tasklist/tasklist.service';
import { Tasklist } from 'app/shared/model/tasklist.model';

describe('Component Tests', () => {
  describe('Tasklist Management Component', () => {
    let comp: TasklistComponent;
    let fixture: ComponentFixture<TasklistComponent>;
    let service: TasklistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TaskTestModule],
        declarations: [TasklistComponent],
      })
        .overrideTemplate(TasklistComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TasklistComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TasklistService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tasklist(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tasklists && comp.tasklists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
