/* Should be called cu-authors
This class is for the pop-up dialog form that I use to create 
and update authors (NOT to delete them) */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorsService } from '../services/authors.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { Validators } from '@angular/forms';//FormControl was here

@Component({
  selector: 'app-cud-authors',
  templateUrl: './cud-authors.component.html',
  styleUrl: './cud-authors.component.css'
})
export class CudAuthorsComponent implements OnInit {
  initial = "";//initial value of contract when user clicks "edit"
  authorsForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authorService: AuthorsService,
    private dialogRef: MatDialogRef<CudAuthorsComponent>,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //@Inject('MatMdcDialogData') public dialogData: any // Inject MatMdcDialogData
    ){
    //building my form using FormBuilder fb
    this.authorsForm = this.fb.group({//was all lowercase
      au_fname: ['', [Validators.required, Validators.pattern(/^.{1,20}$/)]],
      au_lname: ['', [Validators.required, Validators.pattern(/^.{1,40}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      address: ['', [Validators.pattern(/^.{1,40}$/)]],
      city: ['', [Validators.pattern(/^.{1,20}$/)]],
      state: ['', [Validators.pattern(/^[A-Z]{2}$/)]],
      zip: ['', [Validators.pattern(/^\d{5}$/)]],
      contract: ['', [Validators.required]], //contract value can still be a boolean!
    })
  }
  //function called when user 'submits' the dialog-form to 
  onFormSubmit(){
    //is authors form submission is valid, handle accordingly
    if(this.authorsForm.valid){
       /*if form has data (is showing authors info for editing)
       then use service to update the user-specified author in pubs */
      if(this.data){
        console.log(this.data);
        console.log(this.authorsForm.value);
        this.authorService.updateAuthor(this.data.au_id, this.authorsForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Author has been updated!!', 'done');
            //true parameter allows list to automatically be updated in template
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });  
      }
      else{//otherwise (form is initially empty), creating new author
        this.authorBeingCreated();
      }
    }
  }

  authorBeingCreated(){
    console.log(this.authorsForm.value.contract);
      console.log(this.authorsForm.value);
      this.authorService.createAuthor(this.authorsForm.value).subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Author has successfully been created!!', 'done');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      });   
  }
  

  //inserts authors data into their 'Edit Authors' pop-up window
  ngOnInit(): void {
    //changes contact value to string value so it is displayed in "edit" window
    if(this.data){//may need to get rid of this if statement
      this.data.contract = this.data.contract?.toString();
    }
    this.authorsForm.patchValue(this.data);
  }
}
