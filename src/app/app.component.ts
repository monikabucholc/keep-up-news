import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main id="keep-up">
      <app-navbar [innerWidth]="innerWidth" [isSidemenu]="isSidemenu" (toggleSidemenu)="onToggleSidemenu()" class="app-navbar"></app-navbar>
      <app-sidemenu *ngIf="isSidemenu" [innerWidth]="innerWidth" [isSidemenu]="isSidemenu" (toggleSidemenu)="onToggleSidemenu()" class="app-sidemenu"></app-sidemenu>
      <router-outlet></router-outlet>  

    </main>
  `,
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public innerWidth: any;
  public isSidemenu: boolean = false;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerWidth > 900 ? this.isSidemenu = true : this.isSidemenu = false;
  }

  onToggleSidemenu() { this.isSidemenu = !this.isSidemenu }
  
  @HostListener('window: resize', ['$event'])
    onResize() {
      this.innerWidth = window.innerWidth;
    }

}
