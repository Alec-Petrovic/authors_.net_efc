//test suite and 7 test cases work!

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'; // Import Router service
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { CudAuthorsComponent } from './cud-authors/cud-authors.component';
import { MatDialog } from '@angular/material/dialog';


/* Describe is a Jasmine function (jasmine = test framework)
this is used to define a "test suite" which is being named 'AppComponent'
which is also the name of the component being tested */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>; //Mock MatDialog
  let router: Router; // Declare Router variable

  /* Before each function is executed before each test 
  case in the test suite.  */
  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    await TestBed.configureTestingModule({//configures testing module
      imports: [
        RouterTestingModule,
        MatToolbarModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
      /* compiles all components declared above
      (AppComponent being the only one) */
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  //each 'it' statement is a test case! (this test case is named 'should create the app')
/* Checks if AppComponent is successfully created */
  it('should create the app', () => {
    const app = fixture.componentInstance;//retrieves instance made above
    expect(app).toBeTruthy();//indicates component made successfully (if it is 'truthy')
  });

  //checks if title property of this component is 'authors_.net'
  it(`should have as title Authors Display`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Authors Display');
  });

  //checks if component renders title correctly in template
  it('should render title', () => {
    //returns a ComponentFixture object, allowing access to instance of AppComponent
    /* This line allows test to check changes in DOM, including
    if the components template is rendered or not */
    fixture.detectChanges();
    /* This line retrieves the native DOM element associated with 
    the component from the ComponentFixture object. 
    We cast it to HTMLElement to access its properties and methods. */
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('span.center-horizontal');
    expect(titleElement).toBeTruthy(); // Check if title element exists
    expect(titleElement?.textContent).toContain('Authors Display');
  });

  it('should initially display Create Author button', () => {
    fixture.detectChanges();
    const createAuthorButton = fixture.debugElement.query(By.css('button[mat-raised-button][color="primary"]:first-child'));
    expect(createAuthorButton).toBeTruthy();
  });

  it('should open Create Author dialog when Create Author button is clicked', () => {
    const createAuthorButton = fixture.debugElement.query(By.css('button[mat-raised-button][color="primary"]:first-child'));
    createAuthorButton.nativeElement.click();
    expect(mockMatDialog.open).toHaveBeenCalledWith(CudAuthorsComponent);
  });

  it('should navigate to books page and update title when displayBooks() is called', () => {
    spyOn(router, 'navigate');
    component.displayBooks();
    expect(router.navigate).toHaveBeenCalledWith(['/books']);
    expect(component.title).toEqual('Books Display');
    expect(component.showCreateAuthorButton).toBeFalse();
  });

  it('should navigate to authors page and update title when displayAuthors() is called', () => {
    spyOn(router, 'navigate');
    component.displayAuthors();
    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(component.title).toEqual('Authors Display');
    expect(component.showCreateAuthorButton).toBeTrue();
  });
});
