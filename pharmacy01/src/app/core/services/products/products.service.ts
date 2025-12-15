import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  private readonly baseUrl = environment.endpoint;
  private readonly http = inject(HttpClient);

  constructor(){ this.myAppUrl = environment.endpoint;
                 this.myApiUrl = '/api/products';}


 //method OR FUNCTION to create a new product

 createproduct(product: Product): Observable<any> {

  /*alert("Im at product service - line 27 - product.name:"+product.name);
  alert("Im at product service - line 28 - product.address:"+product.address);
  alert("Im at product service - line 29 - product.phone:"+product.phone);*/


    const name : string = product.name; //Nombre del producto
    const product_code : string = product.product_code; //Código
    const description : string = product.description;
    const purchase_price: number = product.purchase_price; // Precio del producto
    const selling_price: number  = product.selling_price; // Precio del producto
    const current_stock: number = product.current_stock; // Stock inicial
    const expiration_date: Date = product.expiration_date;// Fecha de cad
    const supplier: string = product.supplier; // Referencia a la tab
    const lot_number: string = product.lot_number; // Lote
    const storage_location: string = product.storage_location; // Lugar de
    const nutritional_information: string = product.nutritional_information; // Información nutricional
    const notes: string = product.notes; //Notas
    const category: string = product.category;  //Referencia a la tabla de categorías
    const created_at: Date = product.createAt; // Fecha de creación
    const updated_at: Date = product.updateAt; 



  const uploadData = {
       
    name, product_code, description, purchase_price, selling_price, 
    expiration_date, supplier, lot_number, storage_location,
    nutritional_information, notes, category, current_stock,
    created_at, updated_at }

 return this.http.post(`${this.myAppUrl}${this.myApiUrl}/create`, uploadData)} 

//End of the Block to method Service to create a new product

//method to edit an furniture
editproduct(product:any, id:any): Observable<any> {

    const name : string = product.name; //Nombre del producto
    const product_code : string = product.product_code; //Código
    const description : string = product.description;
    const purchase_price: number = product.purchase_price; // Precio del producto
    const selling_price: number = product.selling_price; // Precio del producto
    const current_stock: number = product.current_stock; // Stock inicial
    const expiration_date: Date = product.expiration_date;// Fecha de cad
    const supplier: string = product.supplier; // Referencia a la tab
    const lot_number: string = product.lot_number; // Lote
    const storage_location: string = product.storage_location; // Lugar de
    const nutritional_information: string = product.nutritional_information; // Información nutricional
    const notes: string = product.notes; //Notas
    const category: string = product.category;  //Referencia a la tabla de categorías
    const created_at: Date = product.created_at; // Fecha de creación
    const updated_at: Date = product.updated_at;

const uploadData = {
     
  name, product_code, description, purchase_price, selling_price, 
    expiration_date, supplier, lot_number, storage_location,
    nutritional_information, notes, category, current_stock,
    created_at, updated_at }
  
    //alert ('Estoy en product service -line 50 - this.baseUrlPut+ id'+`${this.myAppUrl}${this.myApiUrl}/update-product/${id}`)

    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/update-product/${id}`, uploadData)}

//End of the Block to method OR FUNCTION to Edit a saved product
//*************************************************************/

//method Service to List all categories

getproductsList(){ 


/*alert ('Estoy en product service -line 59 - ${this.myAppUrl}${this.myApiUrl}/listAll'
  +`${this.myAppUrl}${this.myApiUrl}/listAll`)*/

return this.http.get(
  `${this.myAppUrl}${this.myApiUrl}/listAll`) }

//End of the Block to method Service to List all products
//*************************************************************/

//*************************************************************/
deleteproduct(id:any){ 


//alert("Estoy en product.service.ts - deleteproduct line 109, id:"+id);

return this.http.delete( `${this.myAppUrl}${this.myApiUrl}/delete-product/${id}`,)
}
//End of the Block to method Service to List all products
//*************************************************************/

//method Service to get a product By id
getproductById(id:any){ 

//alert("Estoy en product.service.ts - getproductById line 119, id:"+id);

return this.http.get(`${this.myAppUrl}${this.myApiUrl}/get-single-product/${id}`)}

//End of the Block to method Service get a product By id
//*************************************************************/

// method service to update products in database after sale 

putProductByIdDecA(id:any, Items:any){ 


  //alert("Estoy en product.service.ts - getProductById line 133, id:"+id);
  //alert("Estoy en product.service.ts - getProductById line 134, elementcount :"+Items.quantity);
 
  return this.http.put(`${this.myAppUrl}${this.myApiUrl}/decrease-product-quantity/${id}`, Items)}

//End of the Block to method Service update a products in database after sale
//*************************************************************/


}


