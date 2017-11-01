import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAnalysisComponent } from './object-analysis.component';

describe('ObjectAnalysisComponent', () => {
  let component: ObjectAnalysisComponent;
  let fixture: ComponentFixture<ObjectAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
