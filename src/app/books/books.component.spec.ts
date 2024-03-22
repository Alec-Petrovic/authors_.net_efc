//my first test case for this test suite works!

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

// Mock MatFormFieldControl
class MockMatFormFieldControl {}

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatInputModule,
      ],
      providers: [
        // Provide the mock MatFormFieldControl
        { provide: MatFormFieldControl, useClass: MockMatFormFieldControl }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
