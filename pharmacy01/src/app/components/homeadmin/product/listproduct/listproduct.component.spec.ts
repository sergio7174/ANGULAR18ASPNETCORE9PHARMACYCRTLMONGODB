import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ListproductComponent } from './listproduct.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';


let ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getproductsList']);

ProductsServiceSpy.getproductsList.and.returnValue(of());

describe('ListproductComponent', () => {
  let component: ListproductComponent;
  let fixture: ComponentFixture<ListproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListproductComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        {provide: ProductsService, useValue: ProductsServiceSpy },
       
        ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ListproductComponent);
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
  expect(ProductsServiceSpy.getproductsList).toHaveBeenCalled();
 
 
}));


});
