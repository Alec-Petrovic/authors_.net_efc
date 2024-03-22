/* This test suite and first test case work! */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialogModule
import { CudAuthorsComponent } from './cud-authors.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CudAuthorsComponent', () => {
  let component: CudAuthorsComponent;
  let fixture: ComponentFixture<CudAuthorsComponent>;

  // Define a mock MatDialogRef
  const matDialogRefMock = {
    // Implement any necessary methods or properties used by MatDialogRef
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CudAuthorsComponent],
      imports: [
        HttpClientTestingModule, 
        MatDialogModule,
        MatInputModule, 
        MatFormFieldModule,
        MatRadioModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        // Provide the mock MatDialogRef
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
});
