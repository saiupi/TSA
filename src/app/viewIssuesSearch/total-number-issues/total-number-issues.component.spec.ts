import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNumberIssuesComponent } from './total-number-issues.component';

describe('TotalNumberIssuesComponent', () => {
  let component: TotalNumberIssuesComponent;
  let fixture: ComponentFixture<TotalNumberIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalNumberIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNumberIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
