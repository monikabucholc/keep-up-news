import { Injectable } from '@angular/core';
import { Param } from '../interfaces/param-representation';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArticleRepr, NewsRepr } from '../interfaces/news-representation';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private apiKey: string = environment.apiKey;
  private baseUrl:string = `https://gnews.io/api/v4/`;


  getNews(p: Param):Observable<NewsRepr> {
    let url: string = '';
    if (p.param == '' && p.type == 'search') {
      url = `${this.baseUrl}top-headlines?category=general&lang=en&apikey=${this.apiKey}`;
    } else if (p.type == 'search') {
      url = `${this.baseUrl}search?q=${p.param}&apikey=${this.apiKey}`
    } else {
      url = `${this.baseUrl}top-headlines?category=general&apikey=${this.apiKey}&country=${p.param}`
    }
    return this.http.get<NewsRepr>(url)
  }

  //SELECTED ARTICLE
  private article: ArticleRepr = {
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
  };

  setDetailNews(data: ArticleRepr) {
    this.article = data;
  }
  getDetailNews(): ArticleRepr {
    return this.article;
  }

}
