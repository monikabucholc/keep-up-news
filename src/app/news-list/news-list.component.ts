import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from '../services/api-news.service';
import { NewsRepr } from '../interfaces/news-representation';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news: NewsRepr = { 
    totalArticles: 0,
    articles: [{
      title: '',
      description: '',
      content: '',
      url: '',
      image: '',
      publishedAt: '',
      source: {
        name: '',
        url: '' 
      }
    }]
  }
  

  searchParam: string = 'example';
  constructor(private serviceApi: ApiNewsService) {}
  ngOnInit(): void {
    this.serviceApi.searchParam$.subscribe((searchParam: string) => {
      this.serviceApi.getSearchNews(searchParam)
      .subscribe( {
        next: (data: NewsRepr):void => {
          this.news = data;
          console.log(this.news.articles[0].title)
        },
        error: (error: HttpErrorResponse): void => {
          console.log(error)
        }
      }) 
  })
    
 
      
  }

 

}
