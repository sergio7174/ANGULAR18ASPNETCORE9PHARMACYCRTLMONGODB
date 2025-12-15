import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapMailbox2Flag } from '@ng-icons/bootstrap-icons';
import { bootstrapKeyFill } from '@ng-icons/bootstrap-icons';
import { bootstrapBack } from '@ng-icons/bootstrap-icons';
import { CategoryService } from '../../../../core/services/admin/category.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../core/interfaces/category';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-createcategory',
  standalone: true,
  imports: [ReactiveFormsModule,
            CardModule,
            InputTextModule,
            ButtonModule,
            RouterLink,
            NgIcon],
  providers: [provideIcons({ bootstrapMailbox2Flag, bootstrapKeyFill, bootstrapBack }),ToastrService],
  templateUrl: './createcategory.component.html',
  styleUrl: './createcategory.component.css'
})
export class CreatecategoryComponent {



// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);


/***************end block new procedure ****** */


// var to handle messages from backend about the category process
mensajeBackend:any=[];
dataCategory:any=[];
newCategory:any=[];
AddModel: any = {image:[]};

// inject services dependecies 
private readonly categoryService = inject(CategoryService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);


categoryForm = new FormGroup(
  {
    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    description: new FormControl('', [Validators.required,])
    
  },
);

oncategory() {

  /**** for testing purposes ************/
  try{
    if(this.categoryForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.categoryForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.categoryForm.value };
  
  this.categoryService.createcategory(postData).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.dataCategory = response;
        this.mensajeBackend = this.dataCategory.message;
        this.newCategory = this.dataCategory.newCategory;

        /*alert("Estoy en category.component - line 95 - this.         mensajeBackend:  "+this.mensajeBackend);
        alert("Estoy en category.component - line 96 - this.newCategory:  "
           +this.newCategory);*/

      if (!this.newCategory) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.newCategory) {
      this.toast.success('create Category successfully');
      //this.router.navigate(['login']);
      //window.location.reload();
      // reset form: reactiveFurnitureForm
      this.categoryForm.reset();

      // go to /furnitureCreate page
      this.router.navigate(['/createCategory'],)
      
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get name() {
  return this.categoryForm.controls['name'];
}

get description() {
  return this.categoryForm.controls['description'];
  }
  

}



