import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NewsListComponent } from './news-list.component';
import { NewsService } from '../services/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ErrorComponent } from '../error/error.component';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let newsService: any;

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

  beforeEach(waitForAsync(() => {
    const newsServiceSpy = jasmine.createSpyObj('NewsService', ["getNews"])
    TestBed.configureTestingModule({
      declarations: [NewsListComponent, ErrorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{provide: NewsService, useValue: newsServiceSpy}]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NewsListComponent);
      component = fixture.componentInstance;
      newsService = TestBed.inject(NewsService)
      newsService.getNews.and.returnValue(of(dummyNews));
      fixture.detectChanges();
    })

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download news on init', () => {
    expect(component.news).toEqual(dummyNews);
    expect(newsService.getNews).toHaveBeenCalled();
  })

  it('should create list of news', () => {
    const newsElements = fixture.debugElement.queryAll(By.css('.news-list-item'));
    expect(newsElements.length).toEqual(dummyNews.totalArticles);
  })

});
