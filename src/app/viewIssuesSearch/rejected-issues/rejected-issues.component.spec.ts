import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedIssuesComponent } from './rejected-issues.component';

describe('RejectedIssuesComponent', () => {
  let component: RejectedIssuesComponent;
  let fixture: ComponentFixture<RejectedIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
