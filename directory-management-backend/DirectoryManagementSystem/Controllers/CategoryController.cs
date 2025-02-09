using DirectoryManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Update this according to your project structure
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DirectoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            // Fetch all categories from the database
            var categories = await _context.Categories.ToListAsync();

            // If no categories are found, return a NotFound result
            if (categories == null || categories.Count == 0)
            {
                return NotFound("No categories found.");
            }

            return Ok(categories);  // Return categories as a response
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            // Fetch the category by its ID
            var category = await _context.Categories.FindAsync(id);

            // If category not found, return a NotFound result
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            return Ok(category);  // Return the category as a response
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] Category category)
        {
            // Check if the category data is valid (non-null)
            if (category == null)
            {
                return BadRequest("Invalid category data.");
            }

            // Add the new category to the database
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            // Return a response with the newly created category
            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryID }, category);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] Category category)
        {
            // If the category ID doesn't match the URL parameter, return BadRequest
            if (id != category.CategoryID)
            {
                return BadRequest("Category ID mismatch.");
            }

            // Check if the category exists
            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return NotFound("Category not found.");
            }

            // Update category properties
            existingCategory.Name = category.Name;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            return NoContent();  // Return a 204 status code indicating successful update
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            // Find the category by its ID
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            // Remove the category from the database
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();  // Return a 204 status code indicating successful deletion
        }
    }
}
