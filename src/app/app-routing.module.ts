import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './_views/_dashboard/dashboard/dashboard.component';
import { AuthorComponent } from './_views/_admin/author/author.component';
import { BookComponent } from './_views/_admin/book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: "", pathMatch:"full", redirectTo:"dashboard" },
  { path: "dashboard", component: DashboardComponent },
  { path: "author", component: AuthorComponent },
  { path: "book", component: BookComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
