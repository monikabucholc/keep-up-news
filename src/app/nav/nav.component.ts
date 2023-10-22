import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  template: `
    <header>
      <h1 (click)="onLogoClick()">Logo</h1>
      <form (ngSubmit)="onSubmit()">
          <input type="text" [(ngModel)]="searchParam" name="searchParam">
          <button type="submit">Submit</button>
      </form>
      <div>
          {{ searchParam }}
      </div>
    </header>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  searchParam: string = '';
  constructor(private service: NewsService, private router: Router) {}
  onSubmit() {
    this.service.setParam('search', this.searchParam);
    this.router.navigate(['search', this.searchParam])
  }
  onLogoClick() {
    this.service.setParam('search', 'example');
    this.router.navigate([''])
  }
}
