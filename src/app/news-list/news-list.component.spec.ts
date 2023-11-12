import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  let newsService: NewsService;

  const dummyNews = {
    totalArticles: 3,
    articles: [{
      title: 'a',
      description: 'ab',
      content: 'ab',
      url: 'ab',
      image: 'ab',
      publishedAt: 'ab',
      source: {
        name: 'ab',
        url: 'ab'
      }
    },
    {
      title: 'b',
      description: 'abc',
      content: 'abc',
      url: 'abc',
      image: 'abc',
      publishedAt: 'abc',
      source: {
        name: 'abc',
        url: 'abc'
      }
    },
    {
      title: 'c',
      description: 'abcd',
      content: 'abcd',
      url: 'abcd',
      image: 'abcd',
      publishedAt: 'abcd',
      source: {
        name: 'abcd',
        url: 'abcd'
      }
    }]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsListComponent, ErrorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [NewsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download news on init', () => {
    const dummy = dummyNews;
    spyOn(newsService, 'getNews').and.returnValue(of(dummy));
    component.ngOnInit();
    expect(component.news).toEqual(dummy);
    expect(newsService.getNews).toHaveBeenCalled()
  })

  it('should create list of news', () => {
    const dummy = dummyNews;
    spyOn(newsService, 'getNews').and.returnValue(of(dummy));
    component.ngOnInit();
    fixture.detectChanges();
    const newsElements = fixture.debugElement.queryAll(By.css('.news-list-item'));
    expect(newsElements.length).toEqual(dummy.totalArticles)
  })

});
