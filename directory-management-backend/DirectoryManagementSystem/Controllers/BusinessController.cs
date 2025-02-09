using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class BusinessesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BusinessesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Business>>> GetBusinesses()
    {
        return await _context.Businesses.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Business>> PostBusiness(Business business)
    {
        _context.Businesses.Add(business);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBusinesses), new { id = business.BusinessID }, business);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBusiness(int id, Business updatedBusiness)
    {
        if (id != updatedBusiness.BusinessID)
        {
            return BadRequest("Business ID mismatch.");
        }

        var business = await _context.Businesses.FindAsync(id);
        if (business == null)
        {
            return NotFound();
        }

        // Update business properties
        business.Name = updatedBusiness.Name;
        business.CategoryID = updatedBusiness.CategoryID;
        business.Address = updatedBusiness.Address;
        business.City = updatedBusiness.City;
        business.State = updatedBusiness.State;
        business.ZipCode = updatedBusiness.ZipCode;
        business.PhoneNumber = updatedBusiness.PhoneNumber;
        business.Website = updatedBusiness.Website;
        business.Rating = updatedBusiness.Rating;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(business);  // Return updated business
        }
        catch (DbUpdateConcurrencyException)
        {
            return StatusCode(500, "An error occurred while updating the business.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBusiness(int id)
    {
        var business = await _context.Businesses.FindAsync(id);
        if (business == null) return NotFound();

        _context.Businesses.Remove(business);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
