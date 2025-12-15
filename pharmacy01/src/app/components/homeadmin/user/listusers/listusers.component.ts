import { Component, inject, OnInit,  DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
/**** Category services block ******/
import { UserApiService } from '../../../../core/services/users/users-api.service';
import { Router } from '@angular/router';
import { User } from '../../../../core/interfaces/auth';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-listusers',
  standalone: true,
  imports: [
             FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,
],
providers: [provideIcons({ bootstrapTrash3, 
bootstrapPersonLinesFill })],
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.css'
})
export class ListusersComponent implements OnInit{

// vars to handle auth state to admin user or user
    IsAdmin:string | null = 'false';
    isAuthenticated: any = false;


  
  baseUrl = environment.endpoint;
  messageUser:any="";
  DataUser:any = [];
  Data:any = [];

  /*** vars to handle search ******************/

  items: any = [];
  filteredItems: any = [];
  searchTerm: string = '';

   /*** End Block to vars to handle search ****/

/**** vars to handle pagination  NgxPagination  ********/

page: number = 1; // Current page

/***** End of vars to handle pagination  */

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
private readonly authService = inject(AuthService);
private readonly userService = inject(UserApiService);
private readonly router = inject(Router);
 

  ngOnInit(): void { 
                    this.getDataUsers();
                    //this.filteredItems = this.DataUser; 
                    //this.items = this.DataUser.Category;
                    //this.authService.checkAuthenticationAdmin(); 
                    
    //this.isAuthenticated = this.authService.isAuthenticated();
    //this.IsAdmin = sessionStorage.getItem('isAdmin');
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Users list ********************/
  getDataUsers() {
                  
    //alert("Estoy en listUsers-component - line 71 - getDataUsers()");
    
    this.userService.getListUser().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

        //object from backend answer to request
        this.DataUser = response;
        this.filteredItems = this.DataUser; 
        this.items = this.DataUser; 

       //alert("Estoy en listUsers-component - line 82 - this.DataUser.AllUsers[0].email="+ this.DataUser.AllUsers[0].email);

        /*alert("Estoy en listCategorys-component - line 85 - this.DataUser.users.name="+ this.DataUser.AllUsers[0].email);*/

        this.messageUser = this.DataUser.error

        /*** if there is any error, show it */
        if (this.messageUser){

          this.toast.error(this.messageUser);
          
      }
   /*** End block of the function to get from backend the Category list**/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataUser
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete Category
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();

//alert("EStoy en listCategorys - line 109 - Data.image: "+Data.image);

  this.userService.deleteUser(Data._id).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /homeAdmin
      .then(() => this.router.navigate(['listUsers'])); // then I go to /listUsers page again

})}

// end of block of function to delete Category

// function to edit Category
editDetails(id:any){

  /***alert("Estoy en listCategorys component - line 103 - to ediCategory Comp ..");
  alert("Estoy en listCategorys component - line 128 - to ediCategory Comp .. id: "+id);*/

  this.router.navigate(['/editUser',id]);

}

// end of block of function to edit Category

// function to handle search in Category list *************

get filteredUsers(): User[] {
  /** this.items?.AllUsers? - (AllUsers) comes from what I send from backend in usercontroller GetAllUsers function *****/
 
  return this.items?.AllUsers?.filter((item:any) =>

    item.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
// End of function Block  to handle search in Category list
}



