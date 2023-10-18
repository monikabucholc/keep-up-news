import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <app-nav></app-nav>
      <app-sidemenu></app-sidemenu>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
