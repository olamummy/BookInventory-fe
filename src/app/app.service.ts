import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppSettings} from './_views/_repository/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL = AppSettings.API_ENDPOINT;
  //riderEndPoint = "riders"
  constructor(private http: HttpClient) { }

  getIncomeExpenses() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "this.token" })
    return this.http.get(this.API_URL + 'categories', { headers })
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
