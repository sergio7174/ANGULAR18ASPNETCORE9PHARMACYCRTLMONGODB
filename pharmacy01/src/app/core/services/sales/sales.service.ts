import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Sales } from '../../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  //private readonly http = inject(HttpClient);

  constructor(private readonly http: HttpClient)
  
  { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/sales';
    
    
  
  }
  getItems() { return this.http.get('http://some.url');}
  addItem(item: string) { return this.http.post('http://some.url', { name: item });}

//method OR FUNCTION to create a new Bill

createsale( uploadData: any ): Observable<any> {

  //alert("Im at sales service - line 25 - client.name:"+sale.name);
  //alert("Im at sales service - line 26 - client.CI:"+sale.client_CI);
  //alert("Im at sales service - line 27 - client.phone:"+sale.phone);
  //alert("Im at sales service - line 28 - seller:"+seller);
  //alert("Im at sales service - line 29 - client.amount:"+amount);
  //alert("Im at sales service - line 30 - q_sold:"+q_sold);


 return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, uploadData)
 
} 

//End of the Block method Service to create a new Sale

//method Service to List all sales

getsalesList(){ 


  /*alert ('Estoy en sale service -line 53 - ${this.myAppUrl}${this.myApiUrl}/listAllSales'
    +`${this.myAppUrl}${this.myApiUrl}/listAllSales`)*/
  
  return this.http.get(
    `${this.myAppUrl}${this.myApiUrl}/listAllSales`) }
  
  //End of the Block to method Service to List all sales
  //*************************************************************/
  
  //*************************************************************/
  deletesale(id:any){ 
  
  
  alert("Estoy en sale.service.ts - deletesale line 66, id:"+id);
  
  return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-sale/${id}`,)
  }
  //End of the Block to method Service to Delete one sale
  //*************************************************************/
  



}
