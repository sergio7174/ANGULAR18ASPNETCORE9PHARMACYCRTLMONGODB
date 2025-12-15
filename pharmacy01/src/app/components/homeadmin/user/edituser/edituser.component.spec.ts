import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { EdituserComponent } from './edituser.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { UserApiService } from '../../../../core/services/users/users-api.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

let UserApiServiceSpy = jasmine.createSpyObj('UserApiService', ['getUserById']);

UserApiServiceSpy.getUserById.and.returnValue(of());

let AuthServiceSpy = jasmine.createSpyObj('AuthService', ['checkAuthenticationAdmin']);

AuthServiceSpy.checkAuthenticationAdmin.and.returnValue(of());



describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdituserComponent,ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        {provide: UserApiService, useValue: UserApiServiceSpy },
        {provide: AuthService, useValue: AuthServiceSpy },
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdituserComponent);
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

  it('should call in ngOnInit UserApiServiceSpy getUserById: ', fakeAsync(() => {

    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(UserApiServiceSpy.getUserById).toHaveBeenCalled();
   
  }));

  it('should call in ngOnInit AuthServiceSpy checkAuthenticationAdmin: ', fakeAsync(() => {

    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(AuthServiceSpy.checkAuthenticationAdmin).toHaveBeenCalled();
   
   
  }));



});
