import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousbookingsComponent } from './previousbookings.component';

describe('PreviousbookingsComponent', () => {
  let component: PreviousbookingsComponent;
  let fixture: ComponentFixture<PreviousbookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
