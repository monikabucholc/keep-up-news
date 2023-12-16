import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleRepr, NewsRepr } from '../interfaces/news-representation';
import { NewsService } from '../services/news.service';
import { Param } from '../interfaces/param-representation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { countriesAvailable } from '../data/countries';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-news-list',
  template: `
    <section *ngIf="news.articles.length > 0; else errorSection" class="news-list">
      <h3 class="news-list-results" *ngIf="currentParam.param">RESULTS: {{resultHeader}}</h3>
      <div *ngFor="let article of news.articles" (click)="goToNewsDetails(article)" class="news-list-item">
          <div>
            <div class="news-list-image">
              <img 
                  [src]="article.image ? article.image : '../../assets/absolutvision-WYd_PkCa1BY-unsplash.jpg'" 
                  [attr.alt]="article.title"
                  width="240px">
            </div>
            <h4 class="news-list-title">{{ article.title }}</h4>
          </div>
          <div>
            <div class="news-list-detail">{{article.source.name}}</div>
            <div>{{ article.publishedAt.replace("T", " ").replace("Z", "")}}</div>
          </div>
      </div>
    </section>
    <ng-template #errorSection class="news-list-error"><app-error [errorMsg]="errorMsg"></app-error></ng-template>
  `,
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  constructor(
    private newsService: NewsService, 
    private router: Router,
    private route: ActivatedRoute) {}

  news: NewsRepr = {
    totalArticles: 0,
    articles: []
  };
  public currentParam: Param = {type: '', param: ''};
  public resultHeader: string = '';
  public errorMsg: string = '';
  private subscribtions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribtions.add(
      this.route.params.pipe(
        switchMap((params) => {
          params['code'] ? this.currentParam = {type: 'country', param: params['code']} : this.currentParam = {type: 'search', param: params['search']}
          this.setResultHeader(this.currentParam);
          return this.newsService.getNews(this.currentParam)
      })
    ).subscribe({
      next: (data: NewsRepr):void => {
        this.news = data;
      },
      error: (error: HttpErrorResponse): void => {
        this.errorMsg = `Status error: ${error.status}. ${error.error.errors[0]}`;
      }
    })
    )
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe()
  }

  convertRouteName(route: string): string {
    return route.replace(/[^\w\s]/g, '').replace(/\s/g, '-').toLowerCase()
  };

  goToNewsDetails(article: ArticleRepr) {
    this.newsService.setDetailNews(article);
    this.router.navigate(['details', this.convertRouteName(article.title)])
  }

  setResultHeader(value: Param) {
    if (value.type == 'search') { 
      this.resultHeader = value.param 
    } else if (value.type == 'country') {
      const country = countriesAvailable.find((country) => country.code.toLowerCase() == value.param) 
      if (country) {this.resultHeader = country.name_en;}
    }
  }
}
