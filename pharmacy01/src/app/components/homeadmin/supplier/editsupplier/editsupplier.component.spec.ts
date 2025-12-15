import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { EditsupplierComponent } from './editsupplier.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { SuppliersService } from '../../../../core/services/suppliers/suppliers.service';

let SuppliersServiceSpy = jasmine.createSpyObj('SuppliersService', ['getsupplierById','editsupplier']);

SuppliersServiceSpy.getsupplierById.and.returnValue(of());
SuppliersServiceSpy.editsupplier.and.returnValue(of());

describe('EditsupplierComponent', () => {
  let component: EditsupplierComponent;
  let fixture: ComponentFixture<EditsupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsupplierComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        {provide: SuppliersService, useValue: SuppliersServiceSpy },
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and initialize correctly: ', fakeAsync(() => {

    // Spy on ngOnInit before detectChanges
    spyOn(component, 'ngOnInit').and.callThrough(); 
    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.ngOnInit).toHaveBeenCalled();
  
  }));

  it('should call in ngOnInit SuppliersServiceSpy getsuppliersList, DataSupplier to get a value, ', fakeAsync(() => {

    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(SuppliersServiceSpy.getsupplierById).toHaveBeenCalled();
   
   
  }));

  


});
