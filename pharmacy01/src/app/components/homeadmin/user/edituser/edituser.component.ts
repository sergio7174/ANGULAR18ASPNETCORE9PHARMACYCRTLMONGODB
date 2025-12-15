import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
         FormControl,
         FormGroup,
         ReactiveFormsModule,
         Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPersonCircle } from '@ng-icons/bootstrap-icons';
import { bootstrapHouseAddFill } from '@ng-icons/bootstrap-icons';
import { bootstrapTelephoneForwardFill } from '@ng-icons/bootstrap-icons';
import { UserApiService } from '../../../../core/services/users/users-api.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [
          ReactiveFormsModule,
          CardModule,
          InputTextModule,
          ButtonModule,
          NgIcon],
providers: [provideIcons({ bootstrapPersonCircle, 
                           bootstrapHouseAddFill, bootstrapTelephoneForwardFill }),
                           ToastrService],

  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit{

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/***************end block new procedure ****** */

 // Data that I want to get from URL sended by login component
 ItemUserId: string | null = ""; 

// var to handle messages from backend about the user process
mensajeBackend:any=[];

// var to handle User Data
datauser:any=[];
UpdatedUser:any=[];


// inject services dependecies 
private readonly userService = inject(UserApiService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);
private readonly routerParam = inject(ActivatedRoute);
private readonly authService = inject(AuthService);



edituserForm = new FormGroup(
  {
    fullName: new FormControl('', [Validators.required, Validators.min(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
    ]),
    //password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl('', [Validators.required]),
    
  },);

  ngOnInit(): void {
    // When the component starts call the function updateuserData

    this.updateuserData();
    // check if user is Admin
    this.authService.checkAuthenticationAdmin();
    
    // get the id, sended by the URL, routerParam
    //const id = this.routerParam.snapshot.paramMap.get('id');

      this.routerParam.paramMap.subscribe(params =>{
        
        this.ItemUserId = params.get('id')});
        const id = this.ItemUserId;

    //alert ("Estoy en ngOnInit - edituser - line 73 - id: "+id);


    this.getuserData(id);
}

// delete all fields in form
updateuserData(){


  this.edituserForm = new FormGroup({

  fullName: new FormControl('', [Validators.required, Validators.min(3)]),
  email: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),]),
   
  isAdmin: new FormControl('', [Validators.required]),
      
  }); // End of update User Data function*/
}

getuserData(id:any): void {

  //alert("Estoy en getuserData - edituser.component - line 116 - getuserData - id: "+ id);

  // get the data, to fill the form 
  this.userService.getUserById(id).subscribe((data:any) => {

 //alert("Estoy en getuserData - edituser.component - line 121 - data.name: "+data.User.name);

    this.edituserForm.patchValue({

      fullName: data.User.fullName,
      email: data.User.email,
      // you can't edit a hash password
      //password: data.User.password,
      isAdmin: data.User.isAdmin,
      
    });


  }); } // End of user Data

onEdituser() {

  /**** for testing purposes ************/
  try{
    if(this.edituserForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/


 if (this.edituserForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData: any = { ...this.edituserForm.value };

  // Getting the id from route param
  this.routerParam.paramMap.subscribe(params =>{ 
    this.ItemUserId = params.get('id')});
    const iduser = this.ItemUserId;

  //alert("Estoy en onEdituser - edituser.component - line 167 - iduser: "+iduser);
  
  this.userService.updateUser( iduser, postData).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.datauser = response;
        this.mensajeBackend = this.datauser.message;
        this.UpdatedUser = this.datauser.updatedUser;

  //alert("Estoy en edituser.component - line 172 - this.            
  //   mensajeBackend:  "+this.mensajeBackend);
  //alert("Estoy en user.component - line 174 - this.UpdatedUser:  " +this.UpdatedUser);

      if (!this.UpdatedUser) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.UpdatedUser) {
      this.toast.success('edituser supply component - line 188 - Updated user successfully');
// to reload page - I go to another page and later to the one that I want To go
this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true}).then(() => this.router.navigate(['/editUser',iduser])); // first homeAdmin then I go to /editUser page
      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get fullName() { return this.edituserForm.controls['fullName']};
get email() { return this.edituserForm.controls['email']};
get isAdmin() { return this.edituserForm.controls['isAdmin']};
 

}






