import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiNewsService {
  private apiKey:string = environment.apiKey;
  private baseUrl:string = `https://gnews.io/api/v4/`;
  

  private searchParamSubject: BehaviorSubject<string> = new BehaviorSubject<string>('example');
  searchParam$ = this.searchParamSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  setSearchParam(data: string) {this.searchParamSubject.next(data); console.log('hey')}

  getSearchNews(param: string = 'example'):Observable<any> {
    const searchUrl: string = `${this.baseUrl}search?q=${param}&apikey=${this.apiKey}`;
    return this.http.get<any>(searchUrl)
  }
}
