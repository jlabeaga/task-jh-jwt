import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TaskTestModule } from '../../../test.module';
import { TasklistUpdateComponent } from 'app/entities/tasklist/tasklist-update.component';
import { TasklistService } from 'app/entities/tasklist/tasklist.service';
import { Tasklist } from 'app/shared/model/tasklist.model';

describe('Component Tests', () => {
  describe('Tasklist Management Update Component', () => {
    let comp: TasklistUpdateComponent;
    let fixture: ComponentFixture<TasklistUpdateComponent>;
    let service: TasklistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TaskTestModule],
        declarations: [TasklistUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TasklistUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TasklistUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TasklistService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tasklist(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tasklist();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
