import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTruck } from '@ng-icons/bootstrap-icons';
import { bootstrapHouseAddFill } from '@ng-icons/bootstrap-icons';
import { bootstrapTelephoneForwardFill } from '@ng-icons/bootstrap-icons';
import { SuppliersService } from '../../../../core/services/suppliers/suppliers.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { Suppliers } from '../../../../core/interfaces/suppliers';

@Component({
  selector: 'app-createsupplier',
  standalone: true,
  imports: [ ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon  ],
providers: [provideIcons({ bootstrapTruck, bootstrapHouseAddFill, bootstrapTelephoneForwardFill }),ToastrService],
  templateUrl: './createsupplier.component.html',
  styleUrl: './createsupplier.component.css'
})
export class CreatesupplierComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/***************end block new procedure ****** */


// var to handle messages from backend about the supplier process
mensajeBackend:any=[];
datasupplier:any=[];
newsupplier:any=[];


// inject services dependecies 
private readonly supplierService = inject(SuppliersService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);


supplierForm = new FormGroup(
  {
  name:  new FormControl('', [Validators.required, Validators.min(5)]),
  address:  new FormControl('', [Validators.required, Validators.min(5)]),
  phone:  new FormControl('', [Validators.required, Validators.min(5)]),
    
  },
);

onsupplier() {

  /**** for testing purposes ************/
  try{
    if(this.supplierForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.supplierForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.supplierForm.value };
  
  this.supplierService.createsupplier(postData as Suppliers).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.datasupplier = response;
        this.mensajeBackend = this.datasupplier.message;
        this.newsupplier = this.datasupplier.newSupplier;

        /*alert("Estoy en supplier.component - line 92 - this.mensajeBackend:  "+this.mensajeBackend);
        alert("Estoy en supplier.component - line 93 - this.newsupplier:  " +this.newsupplier.name);*/

      if (!this.newsupplier) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.newsupplier) {
      this.toast.success('Create supply component - line 100 -Create supplier successfully');
      //alert('Create supply component - line 102 -Create supplier successfully');
      //this.router.navigate(['login']);
      //window.location.reload();
      // reset form: reactiveFurnitureForm
      this.supplierForm.reset();

      // go to /furnitureCreate page
      this.router.navigate(['/createSupplier'],)
      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get name() { return this.supplierForm.controls['name']}
get address() { return this.supplierForm.controls['address']}
get phone() { return this.supplierForm.controls['phone']}
  

}




