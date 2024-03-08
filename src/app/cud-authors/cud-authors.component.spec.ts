import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CudAuthorsComponent } from './cud-authors.component';

describe('CudAuthorsComponent', () => {
  let component: CudAuthorsComponent;
  let fixture: ComponentFixture<CudAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CudAuthorsComponent]
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
