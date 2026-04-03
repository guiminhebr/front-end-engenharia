import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervaloList } from './intervalo-list';

describe('IntervaloList', () => {
  let component: IntervaloList;
  let fixture: ComponentFixture<IntervaloList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervaloList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervaloList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
