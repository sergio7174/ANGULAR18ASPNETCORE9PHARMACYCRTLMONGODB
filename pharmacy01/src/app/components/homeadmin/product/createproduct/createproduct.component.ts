import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, inject, DestroyRef, OnInit } from '@angular/core';
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
import { bootstrapFileMedical } from '@ng-icons/bootstrap-icons';
import { bootstrapHouseAddFill } from '@ng-icons/bootstrap-icons';
import { bootstrapTelephoneForwardFill } from '@ng-icons/bootstrap-icons';
import { bootstrapCurrencyDollar } from '@ng-icons/bootstrap-icons';
import { bootstrapCardList } from '@ng-icons/bootstrap-icons';
import { bootstrapCalendarDateFill } from '@ng-icons/bootstrap-icons';

import { ProductsService } from '../../../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { SuppliersService } from '../../../../core/services/suppliers/suppliers.service';
import { Suppliers } from '../../../../core/interfaces/suppliers';
import { CategoryService } from '../../../../core/services/admin/category.service';
import { NumericDirective } from '../../../../core/directive/numeric.directive';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-createproduct',
  standalone: true,
  imports: [
             ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon,
             NumericDirective,
             AsyncPipe,
              ],
providers: [provideIcons({ bootstrapTruck, 
                           bootstrapHouseAddFill, bootstrapTelephoneForwardFill, bootstrapFileMedical,
                           bootstrapCurrencyDollar,
                           bootstrapCardList,
                           bootstrapCalendarDateFill }),ToastrService],
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css'
})
export class CreateproductComponent implements OnInit{

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/***************end block new procedure ****** */

/** vars to handle suppliers Data */
suppliers: any=[];
itemsSuppliers: any = [];

/**** vars to handle category Data */

categories: any=[];
itemsCategories: any = [];

// var to handle messages from backend about the product process
mensajeBackend:any=[];
dataproduct:any=[];
newproduct:any=[];

// inject services dependecies 
private readonly suppliersService = inject(SuppliersService);
private readonly categoriesService = inject(CategoryService);
private readonly productService = inject(ProductsService);
private readonly router = inject(Router);
private readonly AuthService = inject(AuthService);
private readonly toast = inject (ToastrService);

ngOnInit(): void {
  
  this.getSuppliers();
  this.getCategories();
  
}

//** Get Suppliers function  */
getSuppliers() {

  this.suppliersService.getsuppliersList().pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
         
      this.suppliers = response;
      //this.itemsSuppliers = this.suppliers.Suppliers; 
      this.itemsSuppliers = this.suppliers;
    }})

     }



/*** Get Categories function ***/

getCategories() {

  this.categoriesService.getCategoryList().pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
         
      this.categories = response;
      this.itemsCategories = this.categories; 

    }})
}

newProductForm = new FormGroup(
  {
  name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  product_code: new FormControl('', [Validators.required, Validators.minLength(5) ]), 
  description: new FormControl('', [Validators.required ]), 
  purchase_price: new FormControl('', [Validators.required, Validators.min(1) ]),
  selling_price: new FormControl('', [Validators.required, Validators.min(1) ]), 
  current_stock: new FormControl('', [Validators.required ]),
  expiration_date: new FormControl('', [Validators.required ]),
  supplier: new FormControl('', [Validators.required ]),
  lot_number: new FormControl('', [Validators.required ]),
  storage_location: new FormControl('', [Validators.required ]),
  nutritional_information: new FormControl('', [Validators.required ]),
  notes: new FormControl('', [Validators.required ]),
  category: new FormControl('', [Validators.required ]),  
  },
);

onproduct() {

  /**** for testing purposes ************/
  try{
    if(this.newProductForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid: ');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.newProductForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData:any = { ...this.newProductForm.value };
  
  this.productService.createproduct(postData).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.dataproduct = response;
        this.mensajeBackend = this.dataproduct.message;
        this.newproduct = this.dataproduct.product;

        alert("Estoy en product.component - line 167 - this.mensajeBackend:  "+this.mensajeBackend);
        alert("Estoy en product.component - line 168 - this.newproduct.name:  " +this.newproduct.name);

      if (!this.newproduct) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.newproduct) {
      this.toast.success('Create product component - line 176 - Create product successfully');
      //this.router.navigate(['login']);
      //window.location.reload();
      // reset form: reactiveFurnitureForm
      this.newProductForm.reset();

      // go to /furnitureCreate page
      this.router.navigate(['/createProduct'],)
      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get name() { return this.newProductForm.controls['name']};
get product_code() { return this.newProductForm.controls['product_code']};
get description() { return this.newProductForm.controls['description']};
get purchase_price() { return this.newProductForm.controls['purchase_price']};
get selling_price() { return this.newProductForm.controls['selling_price']};
get expiration_date() { return this.newProductForm.controls['expiration_date']};
get supplier() { return this.newProductForm.controls['supplier']};
get lot_number() { return this.newProductForm.controls['lot_number']};
get storage_location() { return this.newProductForm.controls['storage_location']};
get nutritional_information() { return this.newProductForm.controls['nutritional_information']};
get notes() { return this.newProductForm.controls['notes']};
get category() { return this.newProductForm.controls['category']};
get current_stock() { return this.newProductForm.controls['current_stock']};

}









