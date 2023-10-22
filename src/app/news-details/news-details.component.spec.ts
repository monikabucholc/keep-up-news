import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetailsComponent } from './news-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDetailsComponent],
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
