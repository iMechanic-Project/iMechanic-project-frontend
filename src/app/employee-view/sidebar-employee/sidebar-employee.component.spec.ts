import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarEmployeeComponent } from './sidebar-employee.component';
import {ActivatedRoute, Router} from "@angular/router";

describe('SidebarEmployeeComponent', () => {
  let component: SidebarEmployeeComponent;
  let fixture: ComponentFixture<SidebarEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} } // Provide a stub for ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que el dropdown se alterna correctamente
  it('should toggle dropdown', () => {
    component.showDropdown = false;
    component.toggleDropdown();
    expect(component.showDropdown).toBeTrue();

    component.toggleDropdown();
    expect(component.showDropdown).toBeFalse();
  });
});
