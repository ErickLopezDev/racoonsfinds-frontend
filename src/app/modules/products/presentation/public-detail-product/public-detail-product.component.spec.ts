import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDetailProductComponent } from './public-detail-product.component';

describe('PublicDetailProductComponent', () => {
  let component: PublicDetailProductComponent;
  let fixture: ComponentFixture<PublicDetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicDetailProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
