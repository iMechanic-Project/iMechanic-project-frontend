import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarClientComponent } from './sidebar-client.component';
import {ActivatedRoute, Router} from "@angular/router";

describe('SidebarClientComponent', () => {
  let component: SidebarClientComponent;
  let fixture: ComponentFixture<SidebarClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} } // Provide a stub for ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarClientComponent);
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

  // Verifica que el segundo dropdown se alterna correctamente
  it('should toggle second dropdown', () => {
    component.showDropdown2 = false;
    component.toggleDropdown2();
    expect(component.showDropdown2).toBeTrue();

    component.toggleDropdown2();
    expect(component.showDropdown2).toBeFalse();
  });
});
