import { TestBed, fakeAsync, tick, } from '@angular/core/testing';
import { SalesService } from './sales.service';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, HttpClient} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../../../environments/environments';
import { of } from 'rxjs';
import { validSaleReg, blankSaleReg } from '../../../fortesting/DatasaleMock';
import { switchMap, forkJoin } from 'rxjs';

let service: SalesService;
let baseUrl = environment.endpoint;

describe('SalesService', () => {
  let service: SalesService;
  let httpTestingController: HttpTestingController;
  
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        HttpClient,
       
        ]});
    service = TestBed.inject(SalesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should service getsalesList handle a 404 error', () => {
    
    service.getsalesList().subscribe({
    next: () => fail('Expected an error, but got data'), error: (error) => {   expect(error.status).toBe(404);
        expect(error.message).toContain('Not Found');
    }, });
  });

  it('should service getsalesList Get a response:', fakeAsync(() => {
 
 
    service.getsalesList().subscribe((sales) => 
      
      { expect(sales).toEqual({validSaleReg}); 
    });
  
    }));

    it('should service getsalesList handle delayed HTTP responses', fakeAsync(() => {
 
      let result:any = null;
      service.getsalesList().subscribe((sales) => 
        { result = sales 

          tick(500); // Simulate a delay
          expect(result).toEqual(validSaleReg); // Check the result after delay

        });
      }));

     


  it('should service deletesale(id) handle a 404 error', () => {
    
    const id ='yewiuy32879';

    service.deletesale(id).subscribe({
    next: () => fail('Expected an error, but got data'), error: (error) => {   expect(error.status).toBe(404);
        expect(error.message).toContain('Not Found');
    }, });
  });

  it('should service service createsale() handle a 404 error', () => {
    
    const 
    
    name :any='Sergio', //Client Name
    client_CI:any= '7174499' , //Client CI
    phone:any= '0412-9403456' , // Client Phone
    products_details:any='any',
    seller_name:any= 'Billy',
    amount_sold:number= 5,
    quantity_sold:number= 20; 

    
    service.createsale(name,client_CI,phone,seller_name, amount_sold, quantity_sold,products_details).subscribe({
    next: () => fail('Expected an error, but got data'), error: (error) => {   expect(error.status).toBe(404);
        expect(error.message).toContain('Not Found');
    }, });
    
  });
  



// NOT WORKING FOR: httpTestingController.expectOne NOT A FUNCTION
  it('should return all sales List and the HTTP method must be GET', fakeAsync(() => {
    
    service.getsalesList().subscribe(sale => {
    
      expect(sale).toEqual('');
      expect(sale).toBeTrue();
      expect(sale).toBeDefined();
  
  });

  
  }));

  it('should call service getsalesList():', () => {

    
    service.getsalesList().subscribe({next: sale => {
     
      expect(sale).toBeTrue();
      expect(sale).toBeDefined();
      expect(sale).toHaveBeenCalledOnceWith();
      expect(sale).toHaveBeenCalledWith();
      
    }
    
  });
});
  
  
  
  it('should call service deletesale():', () => {

    const id: string = 'e4fr56245235664';
    
    service.deletesale(id).subscribe({next: sale => {
      expect(sale).toEqual('');
      expect(sale).toBeFalse();
      expect(sale).toBeNull();
      expect(sale).toBeTrue();
      expect(sale).toBeDefined();
      expect(sale).toHaveBeenCalledOnceWith(id);
      expect(sale).toHaveBeenCalledWith(id);
      
    }
    
  });
});

it('should call service deletesale(), once, to be call by id, to be defined, to be truthy ', () => {
  const id: string = 'e4fr56245235664';
  let mockService = spyOn( service, 'deletesale');
  service.deletesale(id);
  expect(mockService).toHaveBeenCalledTimes(1);
  expect(mockService).toBeDefined();
  expect(mockService).toBeTruthy();
  expect(mockService).toHaveBeenCalledOnceWith(id);
  expect(mockService).toHaveBeenCalledWith(id);

});



it('should call service getsalesList(), once, to be defined, to be truthy ', () => {
 
  let mockService = spyOn( service, 'getsalesList');
  service.getsalesList();
  expect(mockService).toHaveBeenCalledTimes(1);
  expect(mockService).toBeDefined();
  expect(mockService).toBeTruthy();
  expect(mockService).toHaveBeenCalledOnceWith();
  expect(mockService).toHaveBeenCalledWith();


});



it('should call service createsale() once, to be defined, to be truthy, to be called with parameters:', () => {
  
    const 
    
    name :any='Sergio', //Client Name
    client_CI:any= '7174499' , //Client CI
    phone:any= '0412-9403456' , // Client Phone
    products_details:any='any',
    seller_name:any= 'Billy',
    amount_sold:number= 5,
    quantity_sold:number= 20; 

  let mockService = spyOn( service, 'createsale');
  service.createsale(name,client_CI,phone,seller_name, amount_sold, quantity_sold,products_details);
  expect(mockService).toHaveBeenCalledTimes(1);
  expect(mockService).toBeDefined();
  expect(mockService).toBeTruthy();
  expect(mockService).toHaveBeenCalledWith(name,client_CI,phone,seller_name, amount_sold, quantity_sold,products_details);
  expect(mockService).toHaveBeenCalledOnceWith(name,client_CI,phone,seller_name, amount_sold, quantity_sold,products_details);
  
});

it('should call service getsalesList(), once, to be call by id, to be defined, to be truthy ', () => {
  
  let mockService = spyOn( service, 'getsalesList');
  service.getsalesList();
  expect(mockService).toHaveBeenCalledTimes(1);
  expect(mockService).toBeDefined();
  expect(mockService).toBeTruthy();
  expect(mockService).toHaveBeenCalledOnceWith();
  expect(mockService).toHaveBeenCalledWith();

});

});

// the backend it must be running to pass this test
describe('SalesService - createsale()', () => {

  it('should perform a post to /api/sales with sales data', fakeAsync(() => {

  let myAppUrl:any = environment.endpoint;
  let myApiUrl:any = '/api/sales';

    const
    name :any='Sergio', //Client Name
    client_CI:any= '7174499' , //Client CI
    phone:any= '0412-9403456' , // Client Phone
    sales_details:any='any',
    seller_name:any= 'Billy',
    amount_sold:number= 5,
    quantity_sold:number= 20, 

    httpClientStub: jasmine.SpyObj<HttpClient> = 
    jasmine.createSpyObj( 'http', ['post'] );
    
    let salesService = new SalesService(httpClientStub);

    httpClientStub.post.and.returnValue(of());

    salesService.createsale(name,client_CI,phone,seller_name, amount_sold, quantity_sold,sales_details);

    expect(httpClientStub.post).toHaveBeenCalledWith(`${myAppUrl}${myApiUrl}/`, {name,client_CI,phone,seller_name, amount_sold, quantity_sold,sales_details});

    expect(httpClientStub.post).toBeDefined();
    expect(httpClientStub.post).toHaveBeenCalledTimes(1);
    expect(httpClientStub.post).toBeTruthy();

  })); 

});


// the backend it must be running to pass this test
describe('SalesService - getsalesList()', () => {

  it('should perform a getsalesList to /api/sales:', fakeAsync(() => {

  let myAppUrl:any = environment.endpoint;
  let myApiUrl:any = '/api/sales';

    const 
    httpClientStub: jasmine.SpyObj<HttpClient> = 
    jasmine.createSpyObj( 'http', ['get'] );
    
    let salesService = new SalesService(httpClientStub);

    httpClientStub.get.and.returnValue(of());

    salesService.getsalesList();

    expect(httpClientStub.get).toHaveBeenCalledWith(`${myAppUrl}${myApiUrl}/listAllSales`);
    expect(httpClientStub.get).toBeDefined();
    expect(httpClientStub.get).toHaveBeenCalledTimes(1);
    expect(httpClientStub.get).toBeTruthy();

  })); 

});

// the backend it must be running to pass this test
describe('SalesService - deletesale(id:any)', () => {

  it('should perform a delete to /api/sales with id:', fakeAsync(() => {

  let myAppUrl:any = environment.endpoint;
  let myApiUrl:any = '/api/sales';

    const
    id:any='erioeriu', 
    httpClientStub: jasmine.SpyObj<HttpClient> = 
    jasmine.createSpyObj( 'http', ['delete'] );
    
    let salesService = new SalesService(httpClientStub);

    httpClientStub.delete.and.returnValue(of());

    salesService.deletesale(id);

    expect(httpClientStub.delete).toHaveBeenCalledWith(`${myAppUrl}${myApiUrl}/delete-sale/${id}`);
    expect(httpClientStub.delete).toBeDefined();
    expect(httpClientStub.delete).toHaveBeenCalledTimes(1);
    expect(httpClientStub.delete).toBeTruthy();

  })); 

});





