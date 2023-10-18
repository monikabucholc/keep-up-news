import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsRepr, ArticleRepr } from '../interfaces/news-representation';
import { Param } from '../interfaces/param-representation';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  constructor(private http: HttpClient) {}
  
  //PARAMS
  public param = new BehaviorSubject<Param>({
    type: 'search',
    param: 'example'
  });
  //PARAM - SEARCH 
  setSearchParam(data: string) {
    this.param.next({
      type: 'search',
      param: data
    });
  }
  //PARAM - COUNTRY
  setCountryParam(data: string) {
    this.param.next({
      type: 'country',
      param: data
    })
  }

  //API 
    private apiKey:string = environment.apiKey;
    private baseUrl:string = `https://gnews.io/api/v4/`;
  getNews(param: Param ):Observable<any> {
    let searchUrl: string = ''
    if (param.param == 'example') {
      searchUrl = `${this.baseUrl}search?q=${param.param}&lang=en&apikey=${this.apiKey}`;
    } else if (param.type == 'search') {
      searchUrl = `${this.baseUrl}search?q=${param.param}&apikey=${this.apiKey}`
    } else if (param.type == 'country') {

      searchUrl = `${this.baseUrl}search?q=example&country=${param.param}&apikey=${this.apiKey}`
    }
      return this.http.get<NewsRepr>(searchUrl)
  }


  //SELECTED NEWS FOR DETAILED VIEW
    private news: ArticleRepr = {
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
      this.news = data;
    }
    getDetailNews(): ArticleRepr {
      return this.news;
    }

 




}
