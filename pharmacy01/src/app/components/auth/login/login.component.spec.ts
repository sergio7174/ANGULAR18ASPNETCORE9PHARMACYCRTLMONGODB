import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';
// Http testing module and mocking controller
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { validUserLogin, blankUserLogin } from '../../../fortesting/DataauthMock';

let AuthServiceSpy = jasmine.createSpyObj('AuthService', ['getAllAdmin','login']);
AuthServiceSpy.getAllAdmin.and.returnValue(of());
AuthServiceSpy.login.and.returnValue(of());



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm( userEmail:any, userPassword:any ) {
    
    component.form.controls['email'].setValue(userEmail);
    component.form.controls['password'].setValue(userPassword);

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {provide: AuthService, useValue: AuthServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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

  it('should call in ngOnInit AuthServiceSpy getAllAdmin ', fakeAsync(() => {

    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(AuthServiceSpy.getAllAdmin).toHaveBeenCalled();
   
   
  }));


  it('should trigger the click event, when you press on button login', (() => {

    spyOn(component, 'login').and.callFake(() => null);
     const button = fixture.debugElement.query(
      (val) => val.attributes['id'] === 'btnLogin'
    );
     
     button.triggerEventHandler('click', {}); // Call triggerEventHandler on DebugElement
      fixture.detectChanges(); // Trigger change detection
    
     expect(button).toBeTruthy();
     
    }));

    it('login button click, the login() should be called, when the form is valid ', fakeAsync(() => {

      updateForm(validUserLogin.email, validUserLogin.password, );
      
      const email = validUserLogin.email;
      const password = validUserLogin.password;

      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('#btnLogin');
      button.click();
      fixture.detectChanges();
      expect(AuthServiceSpy.login).toHaveBeenCalled();
      // Check the arguments passed to the mock method
      expect(AuthServiceSpy.login).toHaveBeenCalledWith({email,password} ); // Check the arguments passed to the mock method
    }));



});
