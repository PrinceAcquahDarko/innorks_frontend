import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url= "http://localhost:3000"
  url = "https://radiant-hollows-00909.herokuapp.com"
  constructor(private http:HttpClient) { }


  public loginUser(data:any): Observable<any>{
    return this.http.post<any>(this.url + '/api/v1/login', data)
    .pipe(
      catchError(this.handleError)
    )
  }
  public registerUser(data:any): Observable<any>{
    return this.http.post<any>(this.url + '/api/v1/user/register', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(err:HttpErrorResponse){
    let message = '';

    if(err.error instanceof ErrorEvent){
      message = `an error occured: ${err.error.message}`
    }
    else{
      message =  err.error 
    }

    return throwError(message)


  }
}
