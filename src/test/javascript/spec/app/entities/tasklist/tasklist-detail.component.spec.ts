import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaskTestModule } from '../../../test.module';
import { TasklistDetailComponent } from 'app/entities/tasklist/tasklist-detail.component';
import { Tasklist } from 'app/shared/model/tasklist.model';

describe('Component Tests', () => {
  describe('Tasklist Management Detail Component', () => {
    let comp: TasklistDetailComponent;
    let fixture: ComponentFixture<TasklistDetailComponent>;
    const route = ({ data: of({ tasklist: new Tasklist(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TaskTestModule],
        declarations: [TasklistDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TasklistDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TasklistDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tasklist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tasklist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
