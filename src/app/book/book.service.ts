import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // url = "http://localhost:3000"
  url = "https://radiant-hollows-00909.herokuapp.com"


  constructor(private http:HttpClient) { }

  public uploadBook(data:any): Observable<any>{
    return this.http.post<any>(this.url + '/api/v1/book', data)
    .pipe(
      catchError(this.handleError)
    )
  }
  public updateBook(data:any, id:string): Observable<any>{
    return this.http.put<any>(this.url + '/api/v1/book/id'+ '?bookId=' + id, data)
    .pipe(
      catchError(this.handleError)
    )
  }

    public deletebook(id:string): Observable<any> {
    return this.http
      .delete<any>(this.url + '/api/v1/book/id'+ '?bookId=' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  public getAllBooks(): Observable<any> {
    
    return this.http
      .get<any>(this.url + '/api/v1/book')
      .pipe(
        catchError(this.handleError)
      );
  }

  public getBookById(id:string): Observable<any> {
    return this.http
      .get<any>(this.url + '/api/v1/book/id'+ '?bookId=' + id)
      .pipe(
        catchError(this.handleError)
      );
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
