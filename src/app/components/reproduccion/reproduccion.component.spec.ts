import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproduccionComponent } from './reproduccion.component';

describe('ReproduccionComponent', () => {
  let component: ReproduccionComponent;
  let fixture: ComponentFixture<ReproduccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReproduccionComponent]
    });
    fixture = TestBed.createComponent(ReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
