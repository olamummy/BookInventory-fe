import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppSettings} from '../_repository/app-settings';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = AppSettings.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  getBooks() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'books', { headers })
  }

  getComments(id:number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'books/'  + id + '/comments', { headers })
  }

  createCompany(name:any, id:number) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "this.token" }
      )
    return this.http.post(this.API_URL + 'books/' + id + '/comments', name , { headers })
  }

  getAnAuthor(id:number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'authors/' + id, { headers })
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
