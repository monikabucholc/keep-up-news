import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <header class="navbar">
      <div (click)="onLogoClick()" class="navbar-logo">KEEP UP</div>
      <div class="navbar-form">
        <button type="button" (click)="onToggleSidemenu()" [class]="innerWidth < 900 ? 'navbar-burger' : 'navbar-noburger'" >
          <img src="../../assets/menu_FILL0_wght400_GRAD0_opsz48.svg" alt="Show sidebar" width="32px" height="32px">
        </button>
        <form class="navbar-input" (ngSubmit)="onSubmit()">
          <input type="text" placeholder="FIND NEWS" [(ngModel)]="searchParam" name="searchParam">
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  `,
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  @Input() innerWidth: any;
  @Input() isSidemenu!: boolean;
  @Output() toggleSidemenu = new EventEmitter<void>()
  onToggleSidemenu(): void {
    this.toggleSidemenu.emit()
  }

  constructor(private router: Router) {}

  searchParam: string = '';

  onSubmit() {
    this.router.navigate(['search', this.searchParam]);
    this.searchParam = '';
  }

  onLogoClick() {
    this.router.navigate([''])
  }

}
