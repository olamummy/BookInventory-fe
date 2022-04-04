import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppSettings} from '../../_repository/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  API_URL = AppSettings.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  getAuthors() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'authors', { headers })
  }

  getAnAuthor(id:number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'authors/' + id, { headers })
  }

  getbooks(id:number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'authors/'  + id + '/books', { headers })
  }

  createAuthor(data:any) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "this.token" }
      )
    return this.http.post(this.API_URL + 'authors' , data , { headers })
  }

  updateAuthor(data:any, id:number) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "this.token" }
      )
    return this.http.put(this.API_URL + 'authors/' + id , data , { headers })
  }

  deleteAuthors(id:number) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "this.token" }
      )
    return this.http.delete(this.API_URL + 'authors/' + id ,  { headers })
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
