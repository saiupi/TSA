import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingIssuesComponent } from './pending-issues.component';

describe('PendingIssuesComponent', () => {
  let component: PendingIssuesComponent;
  let fixture: ComponentFixture<PendingIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
