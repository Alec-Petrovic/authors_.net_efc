/* Should be called cu-authors
This class is for the pop-up dialog form that I use to create 
and update authors (NOT to delete them) */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorsService } from '../services/authors.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cud-authors',
  templateUrl: './cud-authors.component.html',
  styleUrl: './cud-authors.component.css'
})
export class CudAuthorsComponent implements OnInit {
  authorsForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authorService: AuthorsService,
    private dialogRef: MatDialogRef<CudAuthorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    //building my form using FormBuilder fb
    this.authorsForm = this.fb.group({
      au_fname: ' ',
      au_lname: ' ',
      phone: ' ',
      address: ' ',
      city: ' ',
      state: ' ',
      zip: ' ',
      contract: ' '
    })
  }
  //function called when user 'submits' the dialog-form to 
  onFormSubmit(){
    //is authors form submission is valid, handle accordingly
    if(this.authorsForm.valid){
       /*if form has data (is showing authors info for editing)
       then use service to update the user-specified author in pubs */
      if(this.data){
        this.authorService.updateAuthor(this.data.au_id, this.authorsForm.value).subscribe({
          next: (val: any) => {
            alert('Author has been updated!!');
            //true parameter allows list to automatically be updated in template
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });  
      }
      else{//otherwise (form is initially empty), creating new author
      console.log(this.authorsForm.value);
      this.authorService.createAuthor(this.authorsForm.value).subscribe({
        next: (val: any) => {
          alert('Author has successfully been created!!');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      });   
    }
    }
  }

  //inserts authors data into their 'Edit Authors' pop-up window
  ngOnInit(): void {
    this.authorsForm.patchValue(this.data);
  }
}
