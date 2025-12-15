import { TestBed } from '@angular/core/testing';
import { UserApiService } from './users-api.service';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersApiService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController]});
    service = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
