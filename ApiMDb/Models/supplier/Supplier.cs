// apimdb/Models/supplier/Supplier.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models.supplier;

public class Supplier
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public DateTime CreateAt { get; set; } // Read-only
}

