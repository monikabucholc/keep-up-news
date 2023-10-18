import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ArticleRepr, NewsRepr } from '../interfaces/news-representation';
import { HttpErrorResponse } from '@angular/common/http';
import { Param } from '../interfaces/param-representation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  template: `
   <section *ngIf="news.articles.length > 0">
      <div *ngFor="let article of news.articles" (click)="goToDetailsPage(article)">
          <img 
              [src]="article.image ? article.image : '../../assets/absolutvision-WYd_PkCa1BY-unsplash.jpg'" 
              [attr.alt]="article.title"
              width="240px">
          <div>{{ article.title }}</div>
          <div>{{ article.source.name }}</div>
          <div>{{ article.publishedAt.replace("T", " ").replace("Z", "")}}</div>
      </div>
    </section>
  `,
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
  
  constructor(
    private newsService: NewsService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.newsService.param.subscribe((param: Param) => {
      this.newsService.getNews(param)
      .subscribe( {
        next: (data: NewsRepr):void => {
          this.news = data;
        },
        error: (error: HttpErrorResponse): void => {
          console.log(error)
        }
      }) 
    })
  };

  convertRouteName(route: string): string {
    return route.replace(/[^\w\s]/g, '').replace(/\s/g, '-').toLowerCase()
  }

  goToDetailsPage(article: ArticleRepr){
    this.newsService.setDetailNews(article)
    this.router.navigate(['details', this.convertRouteName(article.title)])
}
}
