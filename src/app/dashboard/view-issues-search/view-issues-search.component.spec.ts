import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssuesSearchComponent } from './view-issues-search.component';

describe('ViewIssuesSearchComponent', () => {
  let component: ViewIssuesSearchComponent;
  let fixture: ComponentFixture<ViewIssuesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssuesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssuesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
