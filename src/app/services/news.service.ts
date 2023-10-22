import { Injectable} from '@angular/core';
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
  private param = new BehaviorSubject<Param>({
    type: 'search',
    param: 'example'
  });
  public param$: Observable<Param> = this.param.asObservable();


  setParam(type: string, param: string) {
    this.param.next({
      type: type,
      param: param
    });
  }

  //API 
    private apiKey:string = environment.apiKey;
    private baseUrl:string = `https://gnews.io/api/v4/`;
  getNews(param: Param ):Observable<NewsRepr> {
    let searchUrl: string = ''
    if (param.param == 'example') {
      searchUrl = `${this.baseUrl}top-headlines?category=general&lang=en&apikey=${this.apiKey}`;
    } else if (param.type == 'search') {
      searchUrl = `${this.baseUrl}search?q=${param.param}&apikey=${this.apiKey}`
    } else if (param.type == 'country') {

      searchUrl = `${this.baseUrl}top-headlines?category=general&apikey=${this.apiKey}&country=${param.param}`
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
