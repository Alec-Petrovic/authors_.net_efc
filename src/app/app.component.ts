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
  title = 'authors3';

  constructor(private dialog: MatDialog, private router: Router){}

  //opens the "create author" dialog in a new window
  openCudAuthors(){
    this.dialog.open(CudAuthorsComponent);
  }

  //displays books when I click 'search books'
  displayBooks(){
    this.router.navigate(['/books']);
  }

  //displays authors when I click 'display authors'
  displayAuthors(){
    this.router.navigate(['']);
  }
}
