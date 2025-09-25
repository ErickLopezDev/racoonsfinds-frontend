import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateReservationComponent } from './change-state-reservation.component';

describe('ChangeStateReservationComponent', () => {
  let component: ChangeStateReservationComponent;
  let fixture: ComponentFixture<ChangeStateReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStateReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
