import { TestBed } from '@angular/core/testing';
import { SuppliersService } from './suppliers.service';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('SuppliersService', () => {
  let service: SuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
       
        ]});
    service = TestBed.inject(SuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
