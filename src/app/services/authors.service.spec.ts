//test suite and first three test cases works!!

import { TestBed } from '@angular/core/testing';
import { AuthorsService } from './authors.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Author } from '../../interface.authors';
import { Book } from '../../interface.books';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpTestingController: HttpTestingController;

  //beforeEach does 'set up' steps before each test case is
  //executed (i.e. each it() block)
  beforeEach(() => {
    //creates an angular testing module (empty arrary
    //being passed = no specific configurations)
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthorsService,
      ]
    });
    //injects an instance of author service into testing module
    //for testing purposes
    service = TestBed.inject(AuthorsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of authors', () => {
    const mockAuthors: Author[] = [
      {
        au_id: '123-45-6677',
        au_lname: 'Doe',
        au_fname: 'John',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        contract: true
      },
      {
        au_id: '256-89-7854',
        au_lname: 'Smith',
        au_fname: 'Jane',
        phone: '987-654-3210',
        address: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        contract: false
      }
    ];

    service.getAuthors().subscribe(authors => {
      expect(authors).toEqual(mockAuthors);
    });

    const req = httpTestingController.expectOne('http://localhost:5044/api/TodoApp/GetAuthors');
    expect(req.request.method).toEqual('GET');
    req.flush(mockAuthors);
  });

  it('should return a list of books', () => {
    const mockBooks: Book[] = [
      {
        title_id: 'BU4354',
        title: 'Book 1',
        type: 'Fiction',
        pub_id: '1235',
        price: 10.99,
        advance: 1000,
        royalty: 0.15,
        ytd_sales: 500,
        notes: 'This is Book 1',
        pubdate: '2023-01-01'
      },
      {
        title_id: 'PO0987',
        title: 'Book 2',
        type: 'Non-fiction',
        pub_id: '4556',
        price: 15.99,
        advance: 1500,
        royalty: 0.12,
        ytd_sales: 700,
        notes: 'This is Book 2',
        pubdate: '2023-02-15'
      }
    ];

    service.getBooks().subscribe(books => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne('http://localhost:5044/api/TodoApp/GetBooks');
    expect(req.request.method).toEqual('GET');
    req.flush(mockBooks);
  });


});
