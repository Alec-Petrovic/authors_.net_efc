/* This test suite and first six test cases work!*/

import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialogModule
import { CudAuthorsComponent } from './cud-authors.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorsService } from '../services/authors.service';
import { CoreService } from '../core/core.service';
import { of } from 'rxjs';

describe('CudAuthorsComponent', () => {
  let component: CudAuthorsComponent;
  let fixture: ComponentFixture<CudAuthorsComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CudAuthorsComponent>>;
  let mockAuthorsService: jasmine.SpyObj<AuthorsService>;
  let mockCoreService: jasmine.SpyObj<CoreService>;
  
  beforeEach(async () => {
    mockAuthorsService = jasmine.createSpyObj('AuthorsService', ['updateAuthor', 'createAuthor', 'authorBeingCreated']);
    mockCoreService = jasmine.createSpyObj('CoreService', ['openSnackBar']);
    mockDialogRef = jasmine.createSpyObj<MatDialogRef<CudAuthorsComponent>>(['close']);
    mockAuthorsService.createAuthor.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [CudAuthorsComponent],
      providers: [
        FormBuilder,
        { provide: AuthorsService, useValue: mockAuthorsService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CoreService, useValue: mockCoreService }
      ],
      imports: [
        HttpClientTestingModule, 
        MatDialogModule,
        MatInputModule, 
        MatFormFieldModule,
        MatRadioModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CudAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//below are newly added
/* Checks if the create/update author form has all 8 of these
'form controls' (inputs for these 8 pieces of author data) */
it('should initialize form with correct controls', () => {
  expect(component.authorsForm.contains('au_fname')).toBeTruthy();
  expect(component.authorsForm.contains('au_lname')).toBeTruthy();
  expect(component.authorsForm.contains('phone')).toBeTruthy();
  expect(component.authorsForm.contains('address')).toBeTruthy();
  expect(component.authorsForm.contains('city')).toBeTruthy();
  expect(component.authorsForm.contains('state')).toBeTruthy();
  expect(component.authorsForm.contains('zip')).toBeTruthy();
  expect(component.authorsForm.contains('contract')).toBeTruthy();
  // Add more expects for other form controls
});

it('should validate form fields', () => {
  component.authorsForm.patchValue({ au_fname: '', au_lname: '', phone: '', state: 'abc', zip: '8976789'  });
  expect(component.authorsForm.valid).toBeFalsy();
  expect(component.authorsForm.controls['au_fname'].hasError('required')).toBeTruthy();
  expect(component.authorsForm.controls['au_lname'].hasError('required')).toBeTruthy();
  expect(component.authorsForm.controls['phone'].hasError('required')).toBeTruthy();
  expect(component.authorsForm.controls['state'].hasError('pattern')).toBeTruthy();
  expect(component.authorsForm.controls['zip'].hasError('pattern')).toBeTruthy();
});

it('should submit form and call updateAuthor method', fakeAsync(() => {
  mockAuthorsService.updateAuthor.and.returnValue(of({}));
  component.data = { au_id: '777-77-7777' }; // Mock data for editing an existing author
  component.authorsForm.patchValue({ au_fname: 'John', au_lname: 'Doe', phone: '123-456-7890', contract: true });
  component.onFormSubmit();
  tick();
  expect(mockAuthorsService.updateAuthor).toHaveBeenCalledWith('777-77-7777', component.authorsForm.value);
  expect(mockCoreService.openSnackBar).toHaveBeenCalledWith('Author has been updated!!', 'done');
  expect(mockDialogRef.close).toHaveBeenCalledWith(true);
}));


it('should display snackbar message after author is created', fakeAsync(() => {
  const mockAuthorData = {
    au_fname: 'John',
    au_lname: 'Doe',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'City',
    state: 'ST',
    zip: '12345',
    contract: true//was initially true (as a bool type)
  };
  component.authorsForm.patchValue(mockAuthorData); // Patch the form with mock data
  component.authorBeingCreated();
  tick();
  expect(mockCoreService.openSnackBar).toHaveBeenCalledWith('Author has successfully been created!!', 'done');
  expect(mockDialogRef.close).toHaveBeenCalledWith(true);
}));

it('should close dialog after author is updated', fakeAsync(() => {
  mockAuthorsService.updateAuthor.and.returnValue(of({}));
  component.data = { au_id: '777-77-7777' }; // Mock data for editing an existing author
  component.authorsForm.patchValue({ au_fname: 'John', au_lname: 'Doe', phone: '123-456-7890', contract: true });
  component.onFormSubmit();
  tick();
  expect(mockDialogRef.close).toHaveBeenCalledWith(true);
}));

});
