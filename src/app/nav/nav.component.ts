import { Component } from '@angular/core';
import { ApiNewsService } from '../services/api-news.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  searchParam: string = '';
  constructor(public service: ApiNewsService) { }




onSubmit() {
  this.service.setSearchParam(this.searchParam);
}
  

}
