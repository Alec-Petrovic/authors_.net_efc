//my first test case for this test suite works!

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { AuthorsService } from '../services/authors.service';
import { of } from 'rxjs';
import { Book } from '../../interface.books';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

// Mock MatFormFieldControl
class MockMatFormFieldControl {}

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockAuthorsService: jasmine.SpyObj<AuthorsService>;
  let mockPaginator: jasmine.SpyObj<MatPaginator>;
  let tdPubDate = new Date();

  const exBook: Book = {
    title_id: 'AS6990',
    title: 'the yogurt 3000',
    type: 'economy',
    pub_id: '0736',
    price: 999.99,
    advance: 9999.99,
    royalty: 29,
    ytd_sales: 44557,
    notes: "The equestriential experience of eating yogurt in the Trump Tower. Truly astonishing? Or Astonishingly true??",
    pubdate: tdPubDate.toDateString()
  };

  beforeEach(async () => {
    mockPaginator = jasmine.createSpyObj<MatPaginator>('MatPaginator', ['firstPage']);
    mockAuthorsService = jasmine.createSpyObj('AuthorsService', ['getBooks']);
    mockAuthorsService.getBooks.and.returnValue(of([exBook]));

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
        { provide: MatFormFieldControl, useClass: MockMatFormFieldControl },
        { provide: AuthorsService, useValue: mockAuthorsService },
        { provide: MatPaginator, useValue: mockPaginator },
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

  //component.dataSource is the actual books table
  it('should fetch books from service on initialization', () => {
      // Create mock books here
    component.ngOnInit();
    expect(mockAuthorsService.getBooks).toHaveBeenCalled();
    expect(component.books).toEqual([exBook]);
    expect(component.dataSource).toBeTruthy();
  });
  

  it('should apply filter to datasource when applyFilter is called', () => {
    const mockFilterValue = 'yogurt';
    const mockEvent = { target: { value: mockFilterValue } } as unknown as Event;
    component.books = [exBook];
    component.dataSource = new MatTableDataSource([exBook]);
    component.applyFilter(mockEvent);
    expect(component.dataSource.filter).toBe(mockFilterValue.trim().toLowerCase());
  });


  it('should initialize data source with paginator and sort', () => {
    component.ngOnInit();
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.paginator).toBeTruthy();
    expect(component.dataSource.sort).toBeTruthy();
  });
  
  it('should call getBooks on ngOnInit', () => {
    spyOn(component, 'getBooks');
    component.ngOnInit();
    expect(component.getBooks).toHaveBeenCalled();
  });
  
  it('should update filter when applying filter', () => {
    const mockFilterValue = 'yogurt';
    /* This is a mock event object that simulates user input. 
    It mimics the event that would be triggered when a user 
    types into a filter input field */
    const mockEvent = { target: { value: mockFilterValue } } as unknown as Event;
    //represents book table containing exBook (without any filters applied to it yet)
    component.dataSource = new MatTableDataSource([exBook]);
    component.applyFilter(mockEvent);
    //checks if filter works as expected (trimming value & not case sensitive)
    expect(component.dataSource.filter).toBe(mockFilterValue.trim().toLowerCase());
  });





  
  //checks if the MatPaginator method called 'firstPage' is called when a filter 
  //is used (GIVING ME ERRORS)
  it('should call firstPage on paginator when applying filter', () => {
    const mockEvent = { target: { value: 'yogurt' } } as unknown as Event;
    const mockPaginator = jasmine.createSpyObj<MatPaginator>('MatPaginator', ['firstPage']);
    component.paginator = mockPaginator;
    component.dataSource = new MatTableDataSource([exBook]);
    component.applyFilter(mockEvent);
    expect(mockPaginator.firstPage).toHaveBeenCalled();
  });





  
  it('should clear filter when filter value is empty', fakeAsync(() => {
    const mockEvent = { target: { value: '' } } as unknown as Event;
    component.dataSource = new MatTableDataSource([exBook]);
    component.applyFilter(mockEvent);
    tick();
    expect(component.dataSource.filter).toBe('');
  }));
  
  // it('should handle error from getBooks', () => {
  //   const errorMessage = 'Error occurred while fetching books';
  //   mockAuthorsService.getBooks.and.returnValue(throwError(errorMessage));
  //   spyOn(console, 'error');
  //   component.getBooks();
  //   expect(console.error).toHaveBeenCalledWith(errorMessage);
  // });
  

});
