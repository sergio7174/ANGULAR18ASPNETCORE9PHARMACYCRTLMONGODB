export interface Product {

    id:string, // Identificador unico para cada producto
    name : string , //Nombre del producto
    product_code : string , //Código del producto
    description : string , //descripción del producto
    purchase_price: number , // Precio del producto
    selling_price: number , // Precio del producto
    current_stock: number , // Stock
    supplier: string , // Referencia a la tabla de proveedores
    expiration_date: Date , // Fecha de caducidad
    lot_number: string , // Lote
    storage_location: string , // Lugar de almacenamiento
    nutritional_information: string, // Información nutricional
    notes: string, //Notas
    category: string ,  //Referencia a la tabla de categorías
    createAt: Date , // Fecha de creación
    updateAt: Date , // Fecha de actualizacion


}


