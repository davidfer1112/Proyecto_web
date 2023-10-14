import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasComponent } from './listas.component';

describe('ListasComponent', () => {
  let component: ListasComponent;
  let fixture: ComponentFixture<ListasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListasComponent]
    });
    fixture = TestBed.createComponent(ListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
