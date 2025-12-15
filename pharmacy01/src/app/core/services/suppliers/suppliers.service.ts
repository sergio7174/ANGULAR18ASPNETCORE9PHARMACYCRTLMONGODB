import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Suppliers } from '../../interfaces/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  private readonly http = inject(HttpClient);

  constructor(){ this.myAppUrl = environment.endpoint;
                 this.myApiUrl = '/api/suppliers';}


  //method OR FUNCTION to create a new supplier

createsupplier(supplier: Suppliers): Observable<any> {

    /*alert("Im at supplier service - line 27 - supplier.name:"+supplier.name);
    alert("Im at supplier service - line 28 - supplier.address:"+supplier.address);
    alert("Im at supplier service - line 29 - supplier.phone:"+supplier.phone);*/


    const name: string = supplier.name;
    const address: string = supplier.address;
    const phone: string = supplier.phone;

    const uploadData = {name, address, phone}
 
   return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, uploadData)} 

//End of the Block to method Service to create a new supplier

//method to edit an furniture
editsupplier(supplier:any, id:any): Observable<any> {

  const name: string = supplier.name;
  const address: string = supplier.address;
  const phone: string = supplier.phone;

  const uploadData = {name, address, phone}
    
      //alert ('Estoy en supplier service -line 50 - this.baseUrlPut+ id'+`${this.myAppUrl}${this.myApiUrl}/update-supplier/${id}`)

      return this.http.put(`${this.myAppUrl}${this.myApiUrl}/update-supplier/${id}`, uploadData)}

//End of the Block to method OR FUNCTION to Edit a saved supplier
//*************************************************************/

//method Service to List all categories

getsuppliersList(){ 

  
  /*alert ('Estoy en supplier service -line 59 - ${this.myAppUrl}${this.myApiUrl}/listAll'
    +`${this.myAppUrl}${this.myApiUrl}/listAll`)*/

  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/listAll`) }
  
  //End of the Block to method Service to List all suppliers
//*************************************************************/

//*************************************************************/
deletesupplier(id:any){ 

  
  //alert("Estoy en supplier.service.ts - deletesupplier line 72, id:"+id);

  return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-supplier/${id}`,)
}
//End of the Block to method Service to List all products
//*************************************************************/

//method Service to get a supplier By id
getsupplierById(id:any){ 

  //alert("Estoy en supplier.service.ts - getsupplierById line 82, id:"+id);
  
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/get-single-supplier/${id}`)}

//End of the Block to method Service get a supplier By id
//*************************************************************/

}

