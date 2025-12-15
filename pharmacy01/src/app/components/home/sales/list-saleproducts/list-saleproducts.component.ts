import { Component, inject, OnInit,  DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Router } from '@angular/router';
import { Product } from '../../../../core/interfaces/product';;
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapListColumns, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule, DatePipe, DATE_PIPE_DEFAULT_OPTIONS} from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart/cart.service';


@Component({
  selector: 'app-list-saleproducts',
  standalone: true,
  imports: [FormsModule,
            CommonModule,
            NgIcon,
            NgxPaginationModule,
            DatePipe,
            
            
],
providers: [provideIcons({ bootstrapListColumns, 
bootstrapPersonLinesFill }), ToastrService,
{
  provide: DATE_PIPE_DEFAULT_OPTIONS,
  useValue: { dateFormat: "shortTime" }
}],
  templateUrl: './list-saleproducts.component.html',
  styleUrl: './list-saleproducts.component.css'
})
export class ListSaleproductsComponent implements OnInit{


// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
 


  baseUrl = environment.endpoint;
  messageProduct:any="";
  
  DataProduct:any = [];
  //DataProduct$: Signal<any>;
  
  
  Data:any = [];

  /*** vars to handle search ******************/

  items: any = [];
  filteredItems: any = [];

  //items$: Signal <any>;
  //filteredItems$: Signal<any>;
  
  
  searchTerm: string = '';

   /*** End Block to vars to handle search ****/

/**** vars to handle pagination  NgxPagination  ********/

page: number = 1; // Current page

/***** End of vars to handle pagination  */

  private readonly ProductsService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly cartService= inject(CartService);


  ngOnInit(): void { this.getDataProducts(); } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Product list ********************/
  getDataProducts() {
                  
    //alert("Estoy en listsaleproducts-component - line 64 - getDataProducts");
    

    this.ProductsService.getproductsList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request

        this.DataProduct = response;
        this.filteredItems = this.DataProduct; 
        this.items = this.DataProduct; 

       //alert("Estoy en listsaleproducts-component - line 95 - this.DataCategory.products[0].name="+ this.DataProduct.products[0].name);

        /*** alert("Estoy en listsaleproducts-component - line 77 - this.DataCategory.Categorys.name="+ this.DataCategory.Categorys);*/

        this.messageProduct = this.DataProduct().err

        /*** if there is any error, show it */
        if (this.messageProduct){ this.toast.error(this.messageProduct);}
   /*** End block of the function to get from backend the Category list *****/



    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataCategory


/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['home'],)}

// function to delete Category
/*deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();


  this.ProductsService.deleteproduct(Data._id).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listsaleProducts'])); // then I go to /furnitureList page

})}*/

// end of block of function to delete Category

// function to edit Category
onAdd(DataProduct: Product){

  /***alert("Estoy en listCategorys component - line 103 - to ediCategory Comp ..");
  alert("Estoy en listCategorys component - line 104 - to ediCategory Comp .. id: "+id);*/

  //this.router.navigate(['/editProduct',id]);

  //alert("Estoy en onAdd - line 123 - this.DataProduct.name: "+DataProduct.name);
  //alert("Estoy en onAdd - line 124 - this.DataProduct.id: "+DataProduct._id);

  //this.cartService.increaseProductQuantity(DataProduct._id);
  
  
  this.cartService.addItem({
    id: DataProduct.id,
    name: DataProduct.name,
    price: DataProduct.selling_price,
    quantity: 1,
  });

}

// end of block of function to edit Category

// function to handle search in Category list *************

get filteredProducts(): Product[] {
  return this.items?.filter((item:any) => 
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    item.product_code.toLowerCase().includes(this.searchTerm.toLowerCase())
)}

// End of function Block  to handle search in Category list
}




