// apimdb/Models/category/Category.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ApiMDb.Models.category;
public class Category
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DateTime CreateAt { get; set; } // Read-only

}