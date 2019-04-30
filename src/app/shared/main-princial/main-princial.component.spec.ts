import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPrincialComponent } from './main-princial.component';

describe('MainPrincialComponent', () => {
  let component: MainPrincialComponent;
  let fixture: ComponentFixture<MainPrincialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPrincialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPrincialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
