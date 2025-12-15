import { fakeAsync,ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSaleproductsComponent } from './list-saleproducts.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../../../../core/services/cart/cart.service';


let ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getproductsList','getproductsList']);

let CartServiceSpy = jasmine.createSpyObj('CartService', ['onAdd']);


ProductsServiceSpy.getproductsList.and.returnValue(of());
CartServiceSpy.onAdd.and.returnValue(of());

let CartData:any= { _id: 1, name: 'TekLoon', price: 20, quantity: 1 };


describe('ListSaleproductsComponent', () => {
  let component: ListSaleproductsComponent;
  let fixture: ComponentFixture<ListSaleproductsComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSaleproductsComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        {provide: ProductsService, useValue: ProductsServiceSpy },
        {provide: CartService, useValue: CartServiceSpy },
        
       
       
        ]
    })
    .compileComponents();

   
    fixture = TestBed.createComponent(ListSaleproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('Products Service getproductsList should called OnInit ', fakeAsync(() => {

    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(ProductsServiceSpy.getproductsList).toHaveBeenCalled();

}));


  it('should call in ngOnInit ProductsServiceSpy getproductsList', () => {
    spyOn(component, 'getDataProducts'); // Spy on ngOnInit before detectChanges
    fixture.detectChanges(); // Trigger ngOnInit
    expect(ProductsServiceSpy.getproductsList).toHaveBeenCalled();
   
  });

  it('should call ngOnInit and initialize correctly: ', fakeAsync(() => {

    // Spy on ngOnInit before detectChanges
    spyOn(component, 'ngOnInit').and.callThrough(); 
    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.ngOnInit).toHaveBeenCalled();

}));

});

