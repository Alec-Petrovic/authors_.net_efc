import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { Book } from '../../interface.books';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  //used to hold all 'titles' data from pubs database
  books: Book[] = [];

  //columns in my Books table
  displayedColumns: string[] = [
    'title_id', 
    'title', 
    'type', 
    'pub_id',
    'price',
    'advance',
    'royalty',
    'ytd_sales',
    'notes',
    'pubdate'
  ];
  //all Book ('titles') data being sent to table for display
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authorService: AuthorsService){}

  /*when 'Search Books' button is clicked, user sees all books
    instantly when this component is displayed*/
  ngOnInit(): void {
    this.getBooks();
  }

  //calls service to get books ('titles') data from database
  getBooks(): void{
    this.authorService.getBooks().subscribe(books => {
      this.books = books;
      this.dataSource = new MatTableDataSource(books);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /*part of the code from <Mat-table> to filter a users search
    when searching for book(s) (not sure how it works) */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
