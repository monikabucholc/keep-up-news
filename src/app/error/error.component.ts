import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
  <section class="error">
    <h1>We couldn't find the news you are looking for.</h1>
    <h3>{{errorMsg}}</h3>
  </section>

  `,
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() errorMsg: any;

}
