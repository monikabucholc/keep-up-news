import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [  
  { 
    path: '',
    component: NewsListComponent
  },
  {
    path: 'search/:param',
    component: NewsListComponent
  },
  {
    path: 'country/:code',
    component: NewsListComponent
  },
  {
    path: 'details/:title',
    component: NewsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
