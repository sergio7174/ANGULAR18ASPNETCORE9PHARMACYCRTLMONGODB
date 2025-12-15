import { Component, inject,  DestroyRef, OnInit } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Router } from '@angular/router';
import { Product } from '../../../../core/interfaces/product';;
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listproduct',
  standalone: true,
  imports: [
             FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,
],
providers: [provideIcons({ bootstrapTrash3, 
bootstrapPersonLinesFill }), ToastrService],
  templateUrl: './listproduct.component.html',
  styleUrl: './listproduct.component.css'
})
export class ListproductComponent implements OnInit{

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messageProduct:any="";
  DataProduct:any = [];
  Data:any = [];

  /*** vars to handle search ******************/

  items: any = [];
  filteredItems: any = [];
  searchTerm: string = '';

   /*** End Block to vars to handle search ****/

/**** vars to handle pagination  NgxPagination  ********/

page: number = 1; // Current page

/***** End of vars to handle pagination  */

  private readonly ProductsService = inject(ProductsService);
  private readonly router = inject(Router);

  ngOnInit(): void { this.getDataProducts();} // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Product list ********************/
  getDataProducts() {
                  
    //alert("Estoy en listProducts -component - line 70 - getDataProducts");
    
    this.ProductsService.getproductsList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataProduct = response;
        this.filteredItems = this.DataProduct; 
        this.items = this.DataProduct; 

       alert("Estoy en listCategorys-component - line 76 - this.DataProduct.name="+ this.DataProduct.name);

        /*** alert("Estoy en listCategorys-component - line 45 - this.DataCategory.Categorys.name="+ this.DataCategory.Categorys);*/

        this.messageProduct = this.DataProduct.err

        /*** if there is any error, show it */
        if (this.messageProduct){ this.toast.error(this.messageProduct);}
   /*** End block of the function to get from backend the Category list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataCategory
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete Category
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();


  this.ProductsService.deleteproduct(Data.id).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listProducts'])); // then I go to /furnitureList page

})}

// end of block of function to delete Category

// function to edit Category
editDetails(id:any){

  /***alert("Estoy en listCategorys component - line 103 - to ediCategory Comp ..");
  alert("Estoy en listCategorys component - line 104 - to ediCategory Comp .. id: "+id);*/

  this.router.navigate(['/editProduct',id]);

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



