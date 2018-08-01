import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatergoriesDialogComponent } from './catergories-dialog.component';

describe('CatergoriesDialogComponent', () => {
  let component: CatergoriesDialogComponent;
  let fixture: ComponentFixture<CatergoriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatergoriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatergoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
