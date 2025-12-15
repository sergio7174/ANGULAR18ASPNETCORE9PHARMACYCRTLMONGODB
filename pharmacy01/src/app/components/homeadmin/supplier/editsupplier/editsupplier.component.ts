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
import { bootstrapTruck } from '@ng-icons/bootstrap-icons';
import { bootstrapHouseAddFill } from '@ng-icons/bootstrap-icons';
import { bootstrapTelephoneForwardFill } from '@ng-icons/bootstrap-icons';
import { SuppliersService } from '../../../../core/services/suppliers/suppliers.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { Suppliers } from '../../../../core/interfaces/suppliers';

@Component({
  selector: 'app-editsupplier',
  standalone: true,
  imports: [ReactiveFormsModule,
            CardModule,
            InputTextModule,
            ButtonModule,
            NgIcon],
providers: [provideIcons({ bootstrapTruck, bootstrapHouseAddFill, bootstrapTelephoneForwardFill }),ToastrService],
  templateUrl: './editsupplier.component.html',
  styleUrl: './editsupplier.component.css'
})
export class EditsupplierComponent implements OnInit{

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/***************end block new procedure ****** */

 // Data that I want to get from URL sended by login component
 ItemSupplierId: string | null = null; 

// var to handle messages from backend about the supplier process
mensajeBackend:any=[];
datasupplier:any=[];
UpdatedSupplier:any=[];


// inject services dependecies 
private readonly supplierService = inject(SuppliersService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);
private readonly routerParam = inject(ActivatedRoute);



editsupplierForm = new FormGroup(
  {
  name:  new FormControl('', [Validators.required, Validators.min(5)]),
  address:  new FormControl('', [Validators.required, Validators.min(5)]),
  phone:  new FormControl('', [Validators.required, Validators.min(5)]),
    
  },);

  ngOnInit(): void {
    // When the component starts call the function updateSupplierData

    this.updateSupplierData();
    // get the id, sended by the URL, routerParam
    
    /*this.routerParam.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
      ).subscribe(params =>{*/

       // Access route parameter
   
       //const id = this.routerParam.snapshot.paramMap.get('id');

      this.routerParam.paramMap.subscribe(params =>{
        
        this.ItemSupplierId = params.get('id')});
        const id = this.ItemSupplierId;

    alert ("Estoy en ngOnInit - editSupplier - line 84 - id: "+id);


    this.getSupplierData(id);
}

// delete all fields in form
updateSupplierData(){


  this.editsupplierForm = new FormGroup({
    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    address:  new FormControl('', [Validators.required, Validators.min(5)]),
    phone:  new FormControl('', [Validators.required, Validators.min(5)]),
      
  }); // End of updateProductreData function*/
}

getSupplierData(id:any): void {

  //alert("Estoy en getSupplierData - editsupplier.component - line 104 - getProductData - id: "+ id);

  // get the data, to fill the form 
  this.supplierService.getsupplierById(id).subscribe((data:any) => {

     alert("Estoy en getSupplierData - editsupplier.component - line 109 - data.name: "+data.name);


    this.editsupplierForm.patchValue({
      name: data.name,
      address: data.address,
      phone: data.phone,
      
    });


  }); } // End of Supplier Data




onEditsupplier() {

  /**** for testing purposes ************/
  try{
    if(this.editsupplierForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/


 if (this.editsupplierForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.editsupplierForm.value };

  this.routerParam.paramMap.subscribe(params =>{
        
    this.ItemSupplierId = params.get('id')});
    const idSupplier: any = this.ItemSupplierId;

    //alert("Estoy en onEditSupplier - editsupplier.component - line 152 - idSupplier: "+idSupplier);


  
  this.supplierService.editsupplier(postData as Suppliers, idSupplier).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.datasupplier = response;
        this.mensajeBackend = this.datasupplier.message;
        this.UpdatedSupplier = this.datasupplier.updatedSupplier;

        //alert("Estoy en supplier.component - line 92 - this.         mensajeBackend:  "+this.mensajeBackend);
        //alert("Estoy en supplier.component - line 93 - this.UpdatedSupplier:  " +this.UpdatedSupplier);

      if (!this.UpdatedSupplier) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.UpdatedSupplier) {
      this.toast.success('edit supply component - line 173 - Updated supplier successfully');
       this.router.navigate(['/listSuppliers']);
      //window.location.reload();
      // reset form: reactiveFurnitureForm
      this.editsupplierForm.reset();

      // go to /furnitureCreate page
      //this.router.navigate(['/listSuppliers'],)
      // to reload page - I go to another page and later to the one that I want To go
this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
.then(() => this.router.navigate(['/editSupplier',idSupplier])); // then I go to /furnitureList page
      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get name() { return this.editsupplierForm.controls['name']}
get address() { return this.editsupplierForm.controls['address']}
get phone() { return this.editsupplierForm.controls['phone']}
  

}





