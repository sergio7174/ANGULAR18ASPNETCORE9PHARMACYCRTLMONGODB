import { Component, inject, DestroyRef , computed, OnInit} from '@angular/core';
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
import { bootstrapPersonCircle } from '@ng-icons/bootstrap-icons';
import { bootstrapHouseAddFill } from '@ng-icons/bootstrap-icons';
import { bootstrapTelephoneForwardFill } from '@ng-icons/bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../../../../core/services/cart/cart.service';
import { SalesService } from '../../../../core/services/sales/sales.service';
import { ProductsService } from '../../../../core/services/products/products.service';

import { BillItemCardComponent } from '../bill-item-card/bill-item-card.component';
import { Sales } from '../../../../core/interfaces/sales';


@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [ ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon,
             BillItemCardComponent,
             ],
providers: [provideIcons({ bootstrapPersonCircle, bootstrapHouseAddFill, bootstrapTelephoneForwardFill }),ToastrService],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

  /** Getting all this vars from signal object cart in cartService */
  count = computed(() => this.cartService.cart().count);
  total = computed(() => this.cartService.cart().total);
  items = computed(() => this.cartService.cart().items);

// var to handle messages from backend about the supplier process
mensajeBackend:any=[];
datasale:any=[];
newsale:any=[];

UserName = sessionStorage.getItem('name');
messageProduct:any="";
DataProduct:any = [];


// inject services dependecies 
private readonly saleService = inject(SalesService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);
private readonly cartService= inject(CartService);
private readonly productService= inject(ProductsService);


salesForm = new FormGroup(
  {
  name:  new FormControl('', [Validators.required, Validators.min(5)]),
  client_CI:  new FormControl('', [Validators.required, Validators.min(5)]),
  phone:  new FormControl('', [Validators.required, Validators.min(5)]),
    
  },
);


/*** function to handle cart */
onItemQuantityUpdate(quantity: number, id: string) {
  let increase = true;
  const item = this.items().find((t) => t.id === id);
  if (quantity < item!.quantity) increase = false;
  if (increase) {
    this.cartService.increaseItem(item!);
  } else {
    this.cartService.decreaseItem(item!);
  }
}

onRemoveItem(id: string) {
  const item = this.items().find((t) => t.id === id);
  this.cartService.removeItem(item!);
}


onCreateBill(count:any, items:any) {

  /**** for testing purposes ************/
  try{
    if(this.salesForm.valid){
      alert('Profile form is valid');
    } else {
      this.toast.error('Error','Please complete all required fields.');
      return;
    }
  } catch(error){console.log('error: '+error)};

  /************************ cart part **************************/
  
        // getting the numbers of items to getData
        const itemsT = this.items().length;
      
//alert("alert estoy en bill. component - line 122 - itemsT: "+itemsT);  
// getting the elements names and amount to save in database sales 
       
  let elementNames:any = [];
     for (let index = 0; index < itemsT ; index++) {
        
          const elementid:any = items()[index].id;
          const elementcount: any = items()[index].quantity;
          
          elementNames = items()[index].name+", "+" "+"Amount: "+elementcount+" "+elementNames;
          
          //alert("id: "+elementid+" "+"index: "+index+" "+"count: "+" "+elementcount);
          //alert("Estoy en cart.component - line 137 - elementNames: "+elementNames); 
    
    // function to update product amount in database
    this.productService.putProductByIdDecA(items()[index].id, items()[index]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (response) => {       

    this.DataProduct = response;
      this.messageProduct = this.DataProduct.message;
        if (this.messageProduct){ this.toast.success(this.messageProduct);}
  
            }})
}
   
       // alert ("Im in bill.component - line 160 - sali del bucle for: ");
  
  /************************ End of cart part *******************/
  
   const postData: any = { ...this.salesForm.value };
   
    const name: any      = this.salesForm?.value.name; // Client Name
    const client_CI: any = this.salesForm?.value.client_CI; // Client CI
    const phone: any     = this.salesForm?.value.phone; // Client phone
    //alert ("Im in bill.component - line 147 - user name: "+ name);
    //alert ("Im in bill.component - line 148 - client_CI: "+ client_CI);
    //alert ("Im in bill.component - line 149 - phone: "+ phone);
    const seller_name: any = this.UserName;   
    const amount_sold: any = this.total();
    const quantity_sold: any = this.count();
    const products_details = elementNames; // Bill details
  /*alert ("Im in bill.component - line 169 - Seller_name: "+ seller_name);
    alert ("Im in bill.component - line 175 - postData.name: "+ postData.name);
    alert ("Im in bill.component - line 176 - amount_sold: "+ amount_sold);
    alert ("Im in bill.component - line 177 - quantity_sold: "+ quantity_sold);*/
    //alert ("Im in bill.component - line 158 - products_details: "+ products_details);
    
    const uploadData = {
      name, 
      client_CI, 
      phone ,
      seller_name, 
      amount_sold, 
      quantity_sold,
      products_details}


    this.saleService.createsale( uploadData
      
     ).pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
          
          this.datasale = response;
          this.mensajeBackend = this.datasale.message;
          this.newsale = this.datasale.newSale;
  
        //alert("Estoy en bill.component - line 180 - this.mensajeBackend:  "+this.mensajeBackend);
        //alert("Estoy en bill.component - line 181 - this.newsale:  " +this.newsale);
  
        if (!this.newsale) {     
          if (this.mensajeBackend){
            this.toast.error(this.mensajeBackend);
          }}
  
   if (this.newsale) {
        this.toast.success('Create supply component - line 189 -Create Bill successfully');
      
        // reset form: reactiveFurnitureForm
        this.salesForm.reset();
        // clean cart Data
        this.cartService.removeAllItems();
      
        // go to home /Sales to update listProducts view

        this.router.navigate(['/home'],{skipLocationChange: true}).then(() => this.router.navigate(['/Sales'])); // then I go to sales /


      }},
      error: (err) => {
        console.log(err);
    
        this.toast.error('Something went wrong');
      },
    });

       
  }
  /*** to get data from salesForm */
  get name() { return this.salesForm.controls['name']}
  get Client_CI() { return this.salesForm.controls['client_CI']}
  get phone() { return this.salesForm.controls['phone']}


}





