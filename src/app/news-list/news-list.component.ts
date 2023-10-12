import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from '../services/api-news.service';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  searchParam: string = '';
  constructor(private serviceApi: ApiNewsService) {}
  ngOnInit(): void {
    this.serviceApi.searchParam$.subscribe((searchParam: string) => {
      this.serviceApi.getSearchNews(searchParam)
      .subscribe({
        next: (data):void => {
          console.log(data);
          
        }
      }) 
  })
    
 
      
  }

 

}
