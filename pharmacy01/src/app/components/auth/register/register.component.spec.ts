import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideRouter } from '@angular/router';
// Http testing module and mocking controller
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { validUserReg, blankUserReg } from '../../../fortesting/DataauthMock';
import { of } from 'rxjs';



let authServiceSpy = jasmine.createSpyObj('AuthService', ['registerUser']);

authServiceSpy.registerUser.and.returnValue(of());


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  function updateForm( fullName:any, userEmail:any, userPassword:any, confirmPassword:any, isAdmin:any) {
    component.registerForm.controls['fullName'].setValue(fullName);
    component.registerForm.controls['email'].setValue(userEmail);
    component.registerForm.controls['password'].setValue(userPassword);
    component.registerForm.controls['confirmPassword'].setValue(confirmPassword);
    component.registerForm.controls['isAdmin'].setValue(isAdmin);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy}
        ,
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger the click event, when you press on the register button', (() => {

    spyOn(component, 'onRegister').and.callFake(() => null);
     const button = fixture.debugElement.query(
      (val) => val.attributes['id'] === 'btnRegister'
    );
     
     button.triggerEventHandler('click', {}); // Call triggerEventHandler on DebugElement
      fixture.detectChanges(); // Trigger change detection    
     expect(button).toBeTruthy();
    }));

    it('form structure is created successfully',
      () => {
      const registerForm = new FormGroup({
        fullName: new FormControl('Sergio moncada'),
        email: new FormControl(''),
        password: new FormControl('sergio'),
        confirmPassword: new FormControl('sergio'),
      });
      expect(registerForm.valid).toBe(true);
    });

  it('should be invalid when one of the field is not filled in correctly: ', () => {
      component.registerForm.get('fullName')?.setValue('sergio moncada');
      component.registerForm.get('email')?.setValue('sergiogmoncada@yahoo.com');
      // this field its empty
      component.registerForm.get('password')?.setValue('');
      component.registerForm.get('confirmPassword')?.setValue('sergio moncada');
      component.registerForm.get('isAdmin')?.setValue('');
      expect(component.registerForm.valid).toBe(false);
  });

  it('should be invalid when passwords dont match:',  () => {
        component.registerForm.get('fullName')?.setValue('sergio moncada');
        component.registerForm.get('email')?.setValue('sergiogmoncada@yahoo.com');
        // passwords don't match
        component.registerForm.get('password')?.setValue('sergio');
        component.registerForm.get('confirmPassword')?.setValue('sergio Moncada');
        expect(component.registerForm.valid).toBe(false);
  });

it('should be valid when all fields are filled, and passwords match:',  () => {

    component.registerForm.get('fullName')?.setValue('sergio moncada');
    component.registerForm.get('email')?.setValue('sergiogmoncada@yahoo.com');
    // passwords don't match
    component.registerForm.get('password')?.setValue('sergio');
    component.registerForm.get('confirmPassword')?.setValue('sergio');
    component.registerForm.get('isAdmin')?.setValue('false');

    expect(component.registerForm.valid).toBe(true);
    expect(component.registerForm.invalid).toBe(false);

});

it('component initial state', () => {
  expect(component.registerForm).toBeDefined();
  expect(component.registerForm.invalid).toBeTruthy();
  expect(component.mensajeBackend).toBeTruthy();
  expect(component.dataUser).toBeTruthy();
  expect(component.newUser).toBeTruthy();
  expect(component.dataUser).toBeDefined();
  expect(component.mensajeBackend).toBeDefined();
  expect(component.newUser).toBeDefined();
 
});

it('form value should update when u change the input', (() => {
  // validUser.email, validUser.password comes from mock data
  updateForm(validUserReg.fullName,validUserReg.email, validUserReg.password, validUserReg.confirmPassword, validUserReg.isAdmin);
  expect(component.registerForm.value).toEqual(validUserReg);
}));

it('Form invalid should be true when form is invalid', (() => {
  updateForm(blankUserReg.fullName,blankUserReg.email, blankUserReg.password, blankUserReg.confirmPassword, blankUserReg.isAdmin);
  expect(component.registerForm.invalid).toBeTruthy();
}));


it('should require valid email', () => {
  component.registerForm.setValue({ "fullName":"Sergio","email": "invalidemail", "password": "sergio", "confirmPassword": "sergio", "isAdmin":"false"
  });

  expect(component.registerForm.valid).toEqual(false);
});


it('On Register button click, the registerUser() should called, when the form is valid ', fakeAsync(() => {

  updateForm(validUserReg.fullName,validUserReg.email, validUserReg.password, validUserReg.confirmPassword, validUserReg.isAdmin);
  
  fixture.detectChanges();
  
  const button = fixture.debugElement.nativeElement.querySelector('#btnRegister');
  button.click();
  fixture.detectChanges();
  expect(authServiceSpy.registerUser).toHaveBeenCalled();
// Check the arguments passed to the mock method
}));

it('should check register button is enabled after inputs get Entered ', fakeAsync(() => {

  updateForm(validUserReg.fullName,validUserReg.email, validUserReg.password, validUserReg.confirmPassword, validUserReg.isAdmin);
  
  fixture.detectChanges();
  
  const button = fixture.debugElement.nativeElement.querySelector('#btnRegister');
  button.click();
  fixture.detectChanges();
  expect(button.disabled).toBe(false);

}));

it('should check register button is disabled if inputs are empty ', fakeAsync(() => {

  updateForm(blankUserReg.fullName,blankUserReg.email, blankUserReg.password, validUserReg.confirmPassword, validUserReg.isAdmin);
  
  fixture.detectChanges();
  
  const button = fixture.debugElement.nativeElement.querySelector('#btnRegister');
  button.click();
  fixture.detectChanges();
  expect(button.disabled).toBe(true);

}));

it('should fire required field validation for every field if is empty', () => {
  component.dataUser = {
    
    fullName: "",
    email : "",
    password : "",
    confirmPassword: ""
}

  fixture.detectChanges();
  component.onRegister();
  expect(component.registerForm.get('email')?.errors?.['required']).toEqual(true);
  expect(component.registerForm.get('fullName')?.errors?.['required']).toEqual(true);
  expect(component.registerForm.get('password')?.errors?.['required']).toEqual(true);
  expect(component.registerForm.get('confirmPassword')?.errors?.['required']).toEqual(true);

})

it('button click, the onRegister() should be called, when the form is valid ', () => {
  
  updateForm(validUserReg.fullName,validUserReg.email, validUserReg.password, validUserReg.confirmPassword, validUserReg.isAdmin);

  const fullName = validUserReg.fullName;
  const email = validUserReg.email;
  const password = validUserReg.password;
  const isAdmin = validUserReg.isAdmin;

  fixture.detectChanges();
  const button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
  fixture.detectChanges();
  spyOn(window, "alert");
  component.onRegister();
  expect(window.alert).toHaveBeenCalledWith("Profile form is valid")
  expect(authServiceSpy.registerUser).toHaveBeenCalledWith({fullName, email, password, isAdmin}); // Check the arguments passed to the mock method
})

it('should alert invalid form blankuser, validUserData', () => {
  updateForm(blankUserReg.fullName,validUserReg.email, validUserReg.password, validUserReg.confirmPassword, validUserReg.isAdmin);
  fixture.detectChanges();
  const button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
  fixture.detectChanges();
  spyOn(window, "alert");
  component.onRegister();
  expect(window.alert).toHaveBeenCalledWith("Profile form invalid")
})

it('should alert invalid form blankuser ,blankuser ', () => {
  updateForm(blankUserReg.fullName,blankUserReg.email, blankUserReg.password, blankUserReg.confirmPassword, blankUserReg.isAdmin);

  fixture.detectChanges();
  const button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
  fixture.detectChanges();
  spyOn(window, "alert");
  component.onRegister();
  expect(window.alert).toHaveBeenCalledWith("Profile form invalid")
})

it('should trigger the click event, when you press on button OnRegister', (() => {

  spyOn(component, 'onRegister').and.callFake(() => null);
   const button = fixture.debugElement.query(
    (val) => val.attributes['id'] === 'btnRegister'
  );
   
   button.triggerEventHandler('click', {}); // Call triggerEventHandler on DebugElement
    fixture.detectChanges(); // Trigger change detection
  
   expect(button).toBeTruthy();
   
  }));



// end of describe component
});
