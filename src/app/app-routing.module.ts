import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { NewsListComponent } from "./news-list/news-list.component";
import { NewsDetailsComponent } from "./news-details/news-details.component";
import { ErrorComponent } from "./error/error.component";

const routes: Routes = [
    {
        path: '',
        component: NewsListComponent,
    },
    {
        path: 'country/:code',
        component: NewsListComponent,
    },
    {
        path: 'search/:search',
        component: NewsListComponent,
    },
    {
        path: 'details/:title',
        component: NewsDetailsComponent,
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }