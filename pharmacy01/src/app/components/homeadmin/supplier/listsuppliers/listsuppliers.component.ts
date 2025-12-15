import { Component, inject, OnInit,  DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
/**** Supplier services block ******/
import { SuppliersService } from '../../../../core/services/suppliers/suppliers.service';
import { Router } from '@angular/router';
import { Suppliers } from '../../../../core/interfaces/suppliers';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listsuppliers',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    NgIcon,
    NgxPaginationModule,
],
  providers: [provideIcons({ bootstrapTrash3, 
    bootstrapPersonLinesFill })],
  templateUrl: './listsuppliers.component.html',
  styleUrl: './listsuppliers.component.css'
})
export class ListsuppliersComponent implements OnInit {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messageSupplier:any="";
  DataSupplier:any = [];
  Data:any = [];

  DataSupplierTest:any[] = [{  
    name:'Farmatodo C.A', // Nombre del proveedor
    address:'Valencia', // Dirección del proveedor
    phone:'0412-98765432',  // Telefono del proveedor 
}]; 

  /*** vars to handle search ******************/

  items: any = [];
  filteredItems: any = [];
  searchTerm: string = '';

   /*** End Block to vars to handle search ****/

/**** vars to handle pagination  NgxPagination  ********/

page: number = 1; // Current page

/***** End of vars to handle pagination  */

  private readonly  suppliersService = inject( SuppliersService);
  private readonly router = inject(Router);

  ngOnInit(): void { 
                    this.getDataSuppliers();
                    //this.filteredItems = this.DataSupplier; 
                    //this.items = this.DataSupplier.Supplier; 
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Supplier list ************************/
  getDataSuppliers() {
                  
    //alert("Estoy en listSuppliers-component - line 76 - getDataSuppliers");
    
    this. suppliersService.getsuppliersList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataSupplier = response;
        //this.filteredItems = this.DataSupplier; 
        this.items = this.DataSupplier; 

       //alert("Estoy en listSuppliers-component - line 88 - this.DataSupplier.name="+ this.DataSupplier[0]?.name);

        /*** alert("Estoy en listSuppliers-component - line 45 - this.DataSupplier.Suppliers.name="+ this.DataSupplier.Suppliers);*/

        this.messageSupplier = this.DataSupplier.err

        /*** if there is any error, show it */
        if (this.messageSupplier){

          this.toast.error(this.messageSupplier);
          
      }
   /*** End block of the function to get from backend the Supplier list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataSupplier
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete Supplier
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();


  this.suppliersService.deletesupplier(Data.id).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['/listSupplier'])); // then I go to /furnitureList page

})}

// end of block of function to delete Supplier

// function to edit Supplier
editDetails(id:any){

 /* alert("Estoy en listSuppliers component - line 125 - to ediSupplier Comp .. id: "+id);*/

  this.router.navigate(['/editSupplier',id]);

}

// end of block of function to edit Supplier

// function to handle search in Supplier list *************

get filteredSuppliers(): Suppliers[] {
  return this.items.filter((item:any) => 
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
// End of function Block  to handle search in Supplier list
}



