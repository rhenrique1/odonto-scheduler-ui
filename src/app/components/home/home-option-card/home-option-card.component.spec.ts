import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOptionCardComponent } from './home-option-card.component';

describe('HomeOptionCardComponent', () => {
  let component: HomeOptionCardComponent;
  let fixture: ComponentFixture<HomeOptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOptionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
