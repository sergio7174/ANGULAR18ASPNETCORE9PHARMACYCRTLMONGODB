import { TestBed, fakeAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';



describe('AuthService', () => {
  let service: AuthService;
  let mockHttpClient:any;
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['registerUser']);
  authServiceSpy.registerUser.and.returnValue(of());
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        {
          provide: AuthService, useValue: authServiceSpy
        }
       
        ]});
    mockHttpClient = {
get:jasmine.createSpy('get').and.returnValue(of(['Item1', 'Item2'])),
}; 
    service = TestBed.inject(AuthService);
  });

it('should be created', () => {
    expect(service).toBeTruthy();
});

it('should fetch data from API' , fakeAsync(() => { 

  authServiceSpy.registerUser().subscribe((data:any) => {
expect(data).toEqual(['Item1', 'Item2']); // Using 'toEqual' to test array equality 
expect(authServiceSpy.registerUser).toHaveBeenCalledWith('/api/auth/signUp'); // Check HTTP call

});
}));





});
