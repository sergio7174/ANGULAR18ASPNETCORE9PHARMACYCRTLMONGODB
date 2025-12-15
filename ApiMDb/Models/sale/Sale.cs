// apimdb/Models/sale/Sale.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ApiMDb.Models.sale;
public class Sale
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Client_CI { get; set; }
    public string? Phone { get; set; }
    public string? Products_details { get; set; }
    public string? Seller_name { get; set; }
    public int? Amount_sold { get; set; }
    public int? Quantity_sold { get; set; }
    public DateTime CreateAt { get; set; } // Read-only

}