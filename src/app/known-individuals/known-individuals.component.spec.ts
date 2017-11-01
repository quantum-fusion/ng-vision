import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownIndividualsComponent } from './known-individuals.component';

describe('KnownIndividualsComponent', () => {
  let component: KnownIndividualsComponent;
  let fixture: ComponentFixture<KnownIndividualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnownIndividualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnownIndividualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
