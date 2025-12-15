// src/Controllers/MembersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using ApiMDb.Models.sale;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Sale> _sales;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<SalesController> _logger;

    public SalesController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<SalesController> logger )
    {
        _database = mongoDBService.Database;
        _sales = _database.GetCollection<Sale>("Sale");
        _env = env;
         _logger = logger;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] SaleModel model)
    {
         _logger.LogInformation("Iam at Sales.controller- create - line 36 - model.Name: " + model.Name);
          _logger.LogInformation("Iam at Sales.controller- create - line 37 - model.Products_details: " + model.Products_details);
        var sale = new Sale
        {

              Name =              model.Name,
              Client_CI =         model.Client_CI,         
              Phone =             model.Phone,             
              Products_details =  model.Products_details,          
              Seller_name =       model.Seller_name,
              Amount_sold =       model.Amount_sold,
              Quantity_sold =     model.Quantity_sold,
              CreateAt =          DateTime.UtcNow
             
        };

        await _sales.InsertOneAsync(sale);
          _logger.LogInformation("Iam at sales.controller- create - line 53 - Sale created Successfully: " +  sale);
        //return Ok("Member created.");
        // Creates an anonymous object with a property Sale whose value is the sale variable.
        var message = "Bill registered successfully.";
        var newSale = sale;
        return Ok(new { NewSale = newSale, Message = message });
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {  
        var sales = await _sales.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at sales.controller- GetAll - line 63 - saless: " + sales);
        return Ok(sales);
    }

    [HttpGet("get-single-sale/{id}")]
    
    public async Task<IActionResult> GetById(string id)
    {
         _logger.LogInformation("Iam at sales.controller- get-single-sale/{id} - line 71 - Id: " +  id);
        var sale = await _sales.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at sales.controller- Getmember - line 73 - sale: " + sale);
        return sale == null ? NotFound() : Ok(new { Sale = sale });
    }

    [HttpDelete("delete-sale/{id}")]
    
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at sales.controller- delete/{id} - line 81 - Id: " +  id);
        await _sales.DeleteOneAsync(p => p.Id == id);
        return Ok("Sale deleted.");
    }

}


