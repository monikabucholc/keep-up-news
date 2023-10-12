import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'


@Injectable()
export class SearchService {

  private searchParam = new BehaviorSubject<string>('');
  getSearchParam = this.searchParam.asObservable();

  setSearchParam(data: string) {
    this.searchParam.next(data);
  }

}
