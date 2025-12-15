import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './core/services/auth/auth.service';
import { of } from 'rxjs';

let AuthServiceSpy = jasmine.createSpyObj('AuthService', ['checkAuthenticationAdmin','isAuthenticated']);

AuthServiceSpy.checkAuthenticationAdmin.and.returnValue(of());

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ToastrModule.forRoot(),],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        ToastrService,
        {provide: AuthService, useValue: AuthServiceSpy },
        
        ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
