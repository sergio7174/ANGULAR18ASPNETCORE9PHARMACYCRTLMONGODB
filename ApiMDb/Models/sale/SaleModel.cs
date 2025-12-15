// apimdb/Models/sale/SaleModel.cs

using System.ComponentModel.DataAnnotations;

namespace ApiMDb.Models.sale;

public class SaleModel
{ 
    public string? Name { get; set; }
    public string? Client_CI { get; set; }
    public string? Phone { get; set; }
    public string? Products_details { get; set; }
    public string? Seller_name { get; set; }
    public int? Amount_sold { get; set; }
    public int? Quantity_sold { get; set; }
  
}