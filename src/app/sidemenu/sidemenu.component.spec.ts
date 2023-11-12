import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidemenuComponent } from './sidemenu.component';
import { countriesAvailable } from '../data/countries';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
      providers: [{ provide: Router, useValue: routerMock}]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of countries', () => {
    const elements = fixture.debugElement.queryAll(By.css('li'))
    expect(elements.length).toEqual(countriesAvailable.length)
  });

  it('should render img', () => {
    const elements = fixture.debugElement.queryAll(By.css('img'))
    expect(elements.length).toEqual(countriesAvailable.length)
  });

  it('should navigate to country on click', () => {
    component.onCountryClick('TestCode');
    expect(router.navigate).toHaveBeenCalledWith(['country', 'testcode'])
  });

  it('should toggle on click when screen < 900px', () => {
    spyOn(component, 'onToggleSidemenu')
    component.innerWidth = 800;
    fixture.detectChanges();
    component.onCountryClick('TestCode');
    expect(component.onToggleSidemenu).toHaveBeenCalled();
  });

  it('should NOT toggle on click when screen >= 900px', () => {
    spyOn(component, 'onToggleSidemenu')
    component.innerWidth = 900;
    fixture.detectChanges();
    component.onCountryClick('TestCode');
    expect(component.onToggleSidemenu).not.toHaveBeenCalled();
  });

});
