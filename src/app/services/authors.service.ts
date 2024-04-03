import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../../interface.authors';
import { Book } from '../../interface.books';
import { Observable, catchError, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'http://localhost:5044/api/Authors/';
  constructor(private http: HttpClient) { }

  //Gets all authors from pubs database to be displayed 
  getAuthors(): Observable<Author[]>{//was this.apiUrl
    return this.http.get<Author[]>(this.apiUrl+'GetAuthors').pipe(
      catchError(this.handleError)
    );
  }

  //gets all books from 'titles' table from pubs database
  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiUrl+'GetBooks').pipe(
      catchError(this.handleError)
    );
  }

  /*updates specified author in pubs database
  
  id is the au_id for author being updated
  data is all the other data for this particular author */
  updateAuthor(id: string, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}UpdateAuthor/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  //creates user-defined author in pubs database (authors table)
  createAuthor(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'CreateAuthor', data).pipe(
      catchError(this.handleError)
    );
  }

 /*delete author chosen by user in pubs database */
  deleteAuthor(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}DeleteAuthor/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any){
    console.error('API Error occurred: ', error);
    return throwError("API error occurred");
  }

}
