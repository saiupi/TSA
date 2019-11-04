import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfIssuesComponent } from './list-of-issues.component';

describe('ListOfIssuesComponent', () => {
  let component: ListOfIssuesComponent;
  let fixture: ComponentFixture<ListOfIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
