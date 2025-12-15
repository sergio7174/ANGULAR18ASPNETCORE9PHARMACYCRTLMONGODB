// src/Controllers/ClassesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using ApiMDb.Models.category;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Category> _categories;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<CategoryController> _logger;

    public CategoryController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<CategoryController> logger )
    {
        _database = mongoDBService.Database;
        _categories = _database.GetCollection<Category>("Category");
        _env = env;
         _logger = logger;
    }

    [HttpPost("createCategory")]
    
    public async Task<IActionResult> Create([FromForm] CategoryModel model)
    {
         _logger.LogInformation("Iam at Classes.controller- create - line 37 - model.Classname: " + model.Name);
       
        var category = new Category
        {
              Name =        model.Name,
              Description = model.Description,
              CreateAt =    DateTime.UtcNow
        };

         await _categories.InsertOneAsync(category);
          _logger.LogInformation("Iam at Category.controller- create - line 47 - Category created Successfully: " +  category);
        //return Ok("Class created.");
        // Creates an anonymous object with a property Trainer whose value is the trainer variable.
        //return Ok(new { Category = category });
        var message = "Category registered successfully.";
        var newCategory = category;
        return Ok(new { Message = message, NewCategory = newCategory });
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {  
        var categories = await _categories.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at Category.controller- GetAll - line 60 - Categories: " + categories
    );
        return Ok(categories);
    }

    [HttpGet("get-single-category/{id}")]
    
    public async Task<IActionResult> GetById(string id)
    {
         _logger.LogInformation("Iam at Category.controller- GetCategory - line 66 - Id: " +  id);
        var category = await _categories.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at Category.controller- GetCategory - line 68 - category: " + category);
        return category == null ? NotFound() : Ok(category);
    }

    [HttpPut("update-category/{id}")]
   
    public async Task<IActionResult> Update(string id, [FromForm] CategoryModel model)
    {
         _logger.LogInformation("Iam at Category.controller- update/{id} - line 76 - Id: " +  id);
        var category = await _categories.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (category == null) return NotFound();

              
              category.Name =      model.Name;
              category.Description = model.Description;

        await _categories.ReplaceOneAsync(p => p.Id == id, category);
         _logger.LogInformation("Iam at Category.controller- update/{id} - line 85 - Category Updated: " +  category);
        //return Ok("Classe updated.");
        return Ok( category );
    }

    [HttpDelete("delete-category/{id}")]
    
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at Classe.controller- delete/{id} - line 94 - Id: " +  id);
        await _categories.DeleteOneAsync(p => p.Id == id);
        return Ok("Category deleted.");
    }

}
