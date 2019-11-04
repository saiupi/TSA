import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedIssuesComponent } from './approved-issues.component';

describe('ApprovedIssuesComponent', () => {
  let component: ApprovedIssuesComponent;
  let fixture: ComponentFixture<ApprovedIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
