import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './_views/_dashboard/dashboard/dashboard.component';
import { AuthorComponent } from './_views/_admin/author/author.component';
import { BookComponent } from './_views/_admin/book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: "", pathMatch:"full", redirectTo:"dashboard" },
 
  { path: "author", component: AuthorComponent },
  { path: "book", component: BookComponent },
  { path: "", component: DashboardComponent },
  // { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
