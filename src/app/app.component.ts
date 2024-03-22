import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CudAuthorsComponent } from './cud-authors/cud-authors.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Authors Display';
  showCreateAuthorButton = true;

  constructor(private dialog: MatDialog, private router: Router){}

  //opens the "create author" dialog in a new window
  openCudAuthors(){
    this.dialog.open(CudAuthorsComponent);
  }

  //displays books when I click 'search books'
  displayBooks(){
    this.router.navigate(['/books']);
    this.title = 'Books Display';
    this.showCreateAuthorButton = false;
  }

  //displays authors when I click 'display authors'
  displayAuthors(){
    this.router.navigate(['']);
    this.title = 'Authors Display';
    this.showCreateAuthorButton = true;
  }
}
