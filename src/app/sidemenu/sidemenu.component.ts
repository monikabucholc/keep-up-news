import { Component, EventEmitter, Input, Output } from '@angular/core';
import { countriesAvailable } from '../data/countries';
import { Router } from '@angular/router';

interface country {
  name_pl: string,
  name_en: string,
  code: string
}

@Component({
  selector: 'app-sidemenu',
  template: `
    <aside class="sidemenu" >
      <h3>Source:</h3>
      <div></div>
      <ul>
        <li class="sidemenu-country" *ngFor="let country of countries" (click)="onCountryClick(country.code)">
          <img [src]="'https://flagcdn.com/'+ country.code.toLowerCase() + '.svg'" [alt]="'flag of ' + country.name_en" width="24px">
          <span>{{ country.name_en }}</span> 
        </li>
      </ul>
    </aside>
  `,
  styleUrls: ['./sidemenu.component.css']
})

export class SidemenuComponent {
  constructor(private router: Router) {}
  countries: country[] = countriesAvailable;
  @Input() innerWidth: any;
  @Output() toggleSidemenu = new EventEmitter<void>()
  onToggleSidemenu(): void {
    this.toggleSidemenu.emit()
  }

  onCountryClick(code: string) {
    if (this.innerWidth < 900) {this.onToggleSidemenu()};
    this.router.navigate(['country', code.toLowerCase()])
  }

}
