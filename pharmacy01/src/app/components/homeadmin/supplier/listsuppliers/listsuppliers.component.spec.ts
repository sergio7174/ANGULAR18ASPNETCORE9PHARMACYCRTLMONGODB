import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ListsuppliersComponent } from './listsuppliers.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { SuppliersService } from '../../../../core/services/suppliers/suppliers.service';
import { validSupplierReg, blankSupplierReg  } from '../../../../fortesting/DataSupplierMock';

let SuppliersServiceSpy = jasmine.createSpyObj('SuppliersService', ['getsuppliersList']);

SuppliersServiceSpy.getsuppliersList.and.returnValue(of());

describe('ListsuppliersComponent', () => {
  let component: ListsuppliersComponent;
  let fixture: ComponentFixture<ListsuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsuppliersComponent, ToastrModule.forRoot()],
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

    fixture = TestBed.createComponent(ListsuppliersComponent);
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
    expect(SuppliersServiceSpy.getsuppliersList).toHaveBeenCalled();
   
   
  }));

  /*it('should use stub data from getsuppliersList, only for GET method: ', () => {
    const stubData:any[] = [{  
               name:'Farmatodo C.A', // Nombre del proveedor
               address:'Valencia', // Dirección del proveedor
               phone:'0412-98765432',  // Telefono del proveedor 
  }];


      
    SuppliersServiceSpy.getsuppliersList.and.returnValue(stubData[0]); // Stub the method to return specific data
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.DataSupplierTest[0]).toEqual(stubData[0]); // Verify that the component received the stub data });
});*/

it('should initialize with an empty search term', () => {
  expect(component.searchTerm).toBe('');
  expect(component.filteredSuppliers).toMatch('');
  fixture.detectChanges();
  component.searchTerm = 'Sergio';
  expect(component.searchTerm).toBe('Sergio');

});




})





