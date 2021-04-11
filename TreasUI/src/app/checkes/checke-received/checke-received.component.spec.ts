import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckeReceivedComponent } from './checke-received.component';

describe('CheckeReceivedComponent', () => {
  let component: CheckeReceivedComponent;
  let fixture: ComponentFixture<CheckeReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckeReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckeReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
