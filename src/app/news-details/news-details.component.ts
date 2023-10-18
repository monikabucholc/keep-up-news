import { Component } from '@angular/core';
import { ArticleRepr } from '../interfaces/news-representation';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-details',
  template: `
   
   <p>news-details works! {{ news.title }}</p>
  `,
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent {
  news: ArticleRepr;
  constructor(private service: NewsService) {
    this.news = service.getDetailNews()
  }
}
