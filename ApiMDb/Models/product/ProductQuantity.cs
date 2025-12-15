// apimdb/Models/Product.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models.product;
public class ProductQuantity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public int? Quantity { get; set; }
    
}