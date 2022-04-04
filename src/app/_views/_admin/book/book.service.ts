import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppSettings} from '../../_repository/app-settings';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  API_URL = AppSettings.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  getBooks() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'books', { headers })
  }

  getAuthors() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'authors', { headers })
  }

  getComments(id:number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'books/'  + id + '/comments', { headers })
  }

  getABook(id:number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'books/' + id, { headers })
  }

  createBook(data:any) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json'
      }
      )
    return this.http.post(this.API_URL + 'books' , data , { headers })
  }

  updateBook(data:any, id:number) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "this.token" }
      )
    return this.http.put(this.API_URL + 'books/' + id , data , { headers })
  }

  deleteBooks(id:number) {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + "this.token" }
      )
    return this.http.delete(this.API_URL + 'books/' + id ,  { headers })
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
