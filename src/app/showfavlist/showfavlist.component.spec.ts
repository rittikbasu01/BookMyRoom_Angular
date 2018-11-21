import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfavlistComponent } from './showfavlist.component';

describe('ShowfavlistComponent', () => {
  let component: ShowfavlistComponent;
  let fixture: ComponentFixture<ShowfavlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowfavlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowfavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
