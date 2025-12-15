// src/Controllers/TrainersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using ApiMDb.Models.supplier;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Supplier> _supplier;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<SuppliersController> _logger;

    public SuppliersController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<SuppliersController> logger )
    {
        _database = mongoDBService.Database;
        _supplier = _database.GetCollection<Supplier>("Supplier");
        _env = env;
         _logger = logger;
    }

    [HttpPost("create")]
    
    public async Task<IActionResult> Create([FromBody] SupplierModel model)
    {
         _logger.LogInformation("Iam at Suppliers.controller- create - line 37 - model.name: " + model.Name);

        var supplier = new Supplier
        {
              Name =      model.Name,
              Address =   model.Address,
              Phone =     model.Phone,
              CreateAt = DateTime.UtcNow
        };

        await _supplier.InsertOneAsync(supplier);
          _logger.LogInformation("Iam at Suppliers.controller- create - line 48 - Supplier created Successfully: " +  supplier);
        //return Ok("Product created.");
        // Creates an anonymous object with a property Supplier whose value is the supplier variable.
        var message = "Supplier registered successfully.";
        var newSupplier = supplier;
        return Ok(new { Message = message, NewSupplier = newSupplier });
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {  
        var suppliers
     = await _supplier.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at Suppliers.controller- GetAll - line 61 - Suppliers: " + suppliers);
        return Ok(suppliers);
    }

    [HttpGet("get-single-supplier/{id}")]
    
    public async Task<IActionResult> GetById(string id)
    {
         _logger.LogInformation("Iam at Supplier.controller- GetSupplier - line 70 - Id: " +  id);
        var supplier = await _supplier.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at Supplier.controller- GetSupplier - line 72 - Supplier: " +  supplier);
        return supplier == null ? NotFound() : Ok(supplier);
    }

    [HttpPut("update-supplier/{id}")]
   
    public async Task<IActionResult> Update(string id, [FromForm] SupplierModel model)

    {
         _logger.LogInformation("Iam at Suppliers.controller- update/{id} - line 79 - Id: " +  id);
        var supplier = await _supplier.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (supplier == null){ 
            
            var message = "Supplier not found.";
            return NotFound(new { Message = message });
            }

              supplier.Name =    model.Name;
              supplier.Address  =  model.Address;
              supplier.Phone  =  model.Phone;

        await _supplier.ReplaceOneAsync(p => p.Id == id, supplier);
         _logger.LogInformation("Iam at suppliers.controller- update/{id} - line 88 - supplier Updated: " +  supplier);
        //return Ok("supplier updated.");
        return Ok( supplier );
        
    }

    [HttpDelete("delete-supplier/{id}")]
    
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at supplier.controller- delete/{id} - line 97 - Id: " +  id);
        await _supplier.DeleteOneAsync(p => p.Id == id);
        return Ok("Supplier deleted.");
    }

}
