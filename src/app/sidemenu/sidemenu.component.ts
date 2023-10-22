import { Component } from '@angular/core';
import { countriesAvailable } from '../data/countries';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

interface country {
  name_pl: string,
  name_en: string,
  code: string
}
@Component({
  selector: 'app-sidemenu',
  template: `
    <aside class="sidemenu">
      <ul>
        <li *ngFor="let country of countries" (click)="onCountryClick(country.code)">
          {{ country.name_en }}
        </li>

      </ul>
    </aside>
  `,
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  countries: country[] = countriesAvailable
  constructor(private service: NewsService, private router: Router) {}

  onCountryClick(code: string) {
    this.service.setParam('country', code.toLowerCase());
    this.router.navigate(['country', code.toLowerCase()])
  }

}
