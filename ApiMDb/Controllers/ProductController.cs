// src/Controllers/PacksController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using ApiMDb.Models.product;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Product> _product;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<ProductsController> logger )
    {
        _database = mongoDBService.Database;
        _product = _database.GetCollection<Product>("Product");
        _env = env;
         _logger = logger;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] ProductModel model)
    {
         _logger.LogInformation("Iam at Products.controller- create - line 36 - model.name: " + model.Name);
        

        var product = new Product
        {
            Name =                    model.Name,
            Product_code =            model.Product_code, 
            Description =             model.Description,
            Purchase_price     =      model.Purchase_price,
            Selling_price   =         model.Selling_price,
            Current_stock =           model.Current_stock,
            Initial_stock  =          model.Initial_stock,
            Supplier      =           model.Supplier,
            Nutritional_information = model.Nutritional_information,
            Notes      =              model.Notes,
            Create_by_user_id      =  model.Create_by_user_id,
            Last_update_by_user_id  = model.Last_update_by_user_id,
            Category      =           model.Category,
            Storage_location      =   model.Storage_location,
            Lot_number      =         model.Lot_number,
            Expiration_date      =    model.Expiration_date,
            CreateAt =                DateTime.UtcNow

        };

        await _product.InsertOneAsync(product);
          _logger.LogInformation("Iam at product.controller- create - line 62 - product created Successfully: " +  product);
        //return Ok("Product created.");
        // Creates an anonymous object with a property Product whose value is the product variable.
        var message = "Product registered successfully.";
        return Ok(new { Product = product, Message = message });
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {  
        var products = await _product.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at Product.controller- GetAll - line 72 - Products: " + products);
        return Ok(products);
    }

    [HttpGet("get-single-product/{id}")]
    
    public async Task<IActionResult> GetById(string id)
    {
         _logger.LogInformation("Iam at product.controller- GetPack - line 80 - Id: " +  id);
        var product = await _product.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at product.controller- Getproduct - line 82 - product: " +  product);
        return product == null ? NotFound() : Ok(product);
    }

    [HttpPut("decrease-product-quantity/{id}")]
    public async Task<IActionResult> GetDownProductQuantityById(string id, [FromBody] ProductQuantity model)

    {
         //_logger.LogInformation("Iam at product.controller - GetDownProductQuantityById - line 91 - Id: " +  id);
        var Elementcount = model.Quantity;
         //_logger.LogInformation("Iam at product.controller - GetDownProductQuantityById - line 93 - Elementcount: " +  Elementcount);
        var product = await _product.Find(p => p.Id == id).FirstOrDefaultAsync();
        var productQuantity = product.Current_stock;
        //_logger.LogInformation("Iam at product.controller - GetDownProductQuantityById - line 96 - productQuantity: " +  productQuantity);
        var updatedProductQuantity = productQuantity - Elementcount;
        if (productQuantity <= 0)
        { //_logger.LogInformation("There is not Product");
           var message = "There is not Product";
            return Ok (new { Message =  message}); 
        };
        if (productQuantity > 1)
        {
            product.Current_stock = updatedProductQuantity;

            await _product.ReplaceOneAsync(p => p.Id == id, product);
            _logger.LogInformation("Iam at product.controller- GetDownProductQuantityById - line 110 - product: " +  product);
            return Ok(product);
        }
    

        _logger.LogInformation("Iam at product.controller- Getproduct - line 82 - product: " +  product);



        return product == null ? NotFound() : Ok(product);
    }



    [HttpPut("update-product/{id}")]
   
    public async Task<IActionResult> Update(string id, [FromForm] ProductModel model)

    {
         _logger.LogInformation("Iam at product.controller- update/{id} - line 91 - Id: " +  id);
        var product = await _product.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (product == null) return NotFound();

            product.Name =                    model.Name;
            product.Product_code =            model.Product_code; 
            product.Description =             model.Description;
            product.Purchase_price     =      model.Purchase_price;
            product.Selling_price   =         model.Selling_price;
            product.Current_stock =           model.Current_stock;
            product.Initial_stock  =          model.Initial_stock;
            product.Supplier      =           model.Supplier;
            product.Nutritional_information = model.Nutritional_information;
            product.Notes      =              model.Notes;
            product.Create_by_user_id      =  model.Create_by_user_id;
            product.Last_update_by_user_id  = model.Last_update_by_user_id;
            product.Category      =           model.Category;
            product.Storage_location      =   model.Storage_location;
            product.Lot_number      =         model.Lot_number;
            product.Expiration_date      =    model.Expiration_date;

        await _product.ReplaceOneAsync(p => p.Id == id, product);
        var message = "Product Updated successfully.";
        return Ok(new { Product = product, Message = message });
    }

    [HttpDelete("delete-product/{id}")]
    
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at product.controller- delete/{id} - line 122 - Id: " +  id);
        await _product.DeleteOneAsync(p => p.Id == id);
        return Ok("Product deleted.");
    }
}


