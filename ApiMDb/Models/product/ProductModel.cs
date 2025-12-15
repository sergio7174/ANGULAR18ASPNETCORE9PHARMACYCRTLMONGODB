// apimdb/Models/ProductModel.cs

namespace ApiMDb.Models.product;
public class ProductModel
{
    public string? Name { get; set; }
    public string? Product_code { get; set; }
    public string? Description { get; set; }
    public decimal? Purchase_price { get; set; }
    public decimal? Selling_price { get; set; }
    public int? Current_stock { get; set; }
    public int? Initial_stock { get; set; }
    public string? Supplier { get; set; }
    public string? Nutritional_information { get; set; }
    public string? Notes { get; set; }
    public string? Create_by_user_id { get; set; }
    public string? Last_update_by_user_id { get; set; }
    public string? Category { get; set; }
    public string? Storage_location { get; set; }
    public string? Lot_number { get; set; }
    public DateTime Expiration_date { get; set; } // Read-only
   
    
}