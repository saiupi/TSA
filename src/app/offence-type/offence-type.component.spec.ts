import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenceTypeComponent } from './offence-type.component';

describe('OffenceTypeComponent', () => {
  let component: OffenceTypeComponent;
  let fixture: ComponentFixture<OffenceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffenceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
