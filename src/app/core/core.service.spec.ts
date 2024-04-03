//test suite and first four test cases works!

import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  let snackBarSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        CoreService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });
    service = TestBed.inject(CoreService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<any>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should open snackbar with default action', () => {
    const message = 'Test message';
    service.openSnackBar(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Ok', jasmine.any(Object));
  });


  it('should open snackbar with custom action', () => {
    const message = 'Test message';
    const action = 'Retry';
    service.openSnackBar(message, action);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, jasmine.any(Object));
  });

  it('should set duration parameter correctly when calling openSnackBar', () => {
    service.openSnackBar('Test message');
    expect(snackBarSpy.open).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(String), { duration: 3000, verticalPosition: 'top' });
  });

});
