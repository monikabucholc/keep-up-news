import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

const dummyNews = {
  totalArticles: 3,
  articles: [{
    title: 'a',
    description: '',
    content: '',
    url: '',
    image: '',
    publishedAt: '',
    source: {
      name: '',
      url: ''
    }
  },
  {
    title: 'b',
    description: '',
    content: '',
    url: '',
    image: '',
    publishedAt: '',
    source: {
      name: '',
      url: ''
    }
  },
  {
    title: 'c',
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

describe('NewsService', () => {
  let service: NewsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(NewsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return detail article with getDetailNews', () => {
    service.setDetailNews(dummyNews.articles[0])
    expect(service.getDetailNews()).toEqual(dummyNews.articles[0])
  })

  it('should get news with httpClient', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(dummyNews));
    service = new NewsService(httpClientSpy);

    service.getNews({type: '', param: ''}).subscribe({
      next: (data) => { 
        expect(data).toEqual(dummyNews);
        done()
      },
      error: (error) => {
        console.log(error);
        done.fail(error);
      }
    })
  })
});
