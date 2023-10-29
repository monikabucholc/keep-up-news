import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ArticleRepr } from '../interfaces/news-representation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-news-details',
  template: `
    <section class="news-detail">
      <h2>{{ article.title }}</h2>
      <img [src]="article.image" [alt]="article.title">
      <p>{{ article.description }}</p>
      <p>{{ article.content }}</p>
      <div>Published: {{ article.publishedAt.replace("T", " ").replace("Z", "")}}</div>
      <div>Source: {{article.source.name}}, {{article.source.url}}</div>
    </section>
  `,
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent {
  public article: ArticleRepr; 
  constructor(private service: NewsService, private router: Router) {
    this.article = this.service.getDetailNews();
    if (this.article.title == '') {
      this.router.navigate([''])
    }
  }
}
