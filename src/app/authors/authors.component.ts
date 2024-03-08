import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CudAuthorsComponent } from '../cud-authors/cud-authors.component';
import { Author } from '../../interface.authors';
import { AuthorsService } from '../services/authors.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

  //columns in my authors table
  displayedColumns: string[] = [
    'au_id', 
    'au_fname', 
    'au_lname', 
    'phone', 
    'address', 
    'city', 
    'state', 
    'zip', 
    'contract',
    'action'
  ];

  //authors that are sent to table for display
  dataSource!: MatTableDataSource<Author>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //array that initially stores all authors to display in table
  authors: Author[] = [];

  constructor(private dialog: MatDialog, private authorService: AuthorsService, private router: Router){}

  //this is for clicking on "create author" button top-right corner
  openCudAuthors(){
    const dialogRef = this.dialog.open(CudAuthorsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getAuthors();
        }
      },
    });
  }

  //display authors in table as soon as component is displayed
  ngOnInit(): void{
    this.getAuthors();
  }

  //uses service to get all authors from pubs database to display
  getAuthors(): void{
    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors
      this.dataSource = new MatTableDataSource(authors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /* part of code from angular material components site for <mat-table>
    and is used to filter author searches */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //uses service to delete user-specified author from pubs authors table
  deleteAuthor(id: number){
    this.authorService.deleteAuthor(id).subscribe({
      next: (res) => {
        alert('Employee deleted successfully!');
        this.getAuthors();//updates authors on UI (to show deleted one)
      },
      error: console.log
    })
  }

  /*this is for clicking on "edit" button in table 
    (opens form in dialog in new window with all the authors
    current data displayed) */
  openEditForm(data: any){
    //reference allows authors to update on frontend when CUD are done
    const dialogRef = this.dialog.open(CudAuthorsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getAuthors();
        }
      },
    });
  }
}
