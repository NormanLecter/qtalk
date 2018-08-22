import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsHistoryComponent } from './rooms-history.component';

describe('RoomsHistoryComponent', () => {
  let component: RoomsHistoryComponent;
  let fixture: ComponentFixture<RoomsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
