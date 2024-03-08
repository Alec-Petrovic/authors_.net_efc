import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../../interface.authors';
import { Book } from '../../interface.books';
import { Observable, catchError, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'http://localhost:5000/authors';
  private bookUrl = 'http://localhost:5000/books';
  constructor(private http: HttpClient) { }

  //Gets all authors from pubs database to be displayed 
  getAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  //gets all books from 'titles' table from pubs database
  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.bookUrl).pipe(
      catchError(this.handleError)
    );
  }

  /*updates specified author in pubs database
  
  id is the au_id for author being updated
  data is all the other data for this particular author */
  updateAuthor(id: number, data: any): Observable<any>{
    return this.http.put(`http://localhost:5000/authors/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  //creates user-defined author in pubs database (authors table)
  createAuthor(data: any): Observable<any>{
    return this.http.post('http://localhost:5000/authors/create', data).pipe(
      catchError(this.handleError)
    );
  }

 /*delete author chosen by user in pubs database */
  deleteAuthor(id: number): Observable<any>{
    return this.http.delete(`http://localhost:5000/authors/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any){
    console.error('API Error occurred: ', error);
    return throwError("API error occurred");
  }

}
