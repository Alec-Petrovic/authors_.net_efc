using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Security.AccessControl;
using Newtonsoft.Json;//for json serialization and deserialization
using Server.Models;//blah

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]//change this to change routes
    [ApiController]

    public class AuthorsController : ControllerBase//change this to change routes
    {
        private IConfiguration _configuration ;//used to get database connection details?
        private readonly PubsContext _context;//readonly may cause problems later
        public AuthorsController(PubsContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private string GenerateRandomAu_id()
        {
            // Generate random numbers for each part of the AU_ID format
            Random random = new Random();
            int firstPart = random.Next(1000);
            int secondPart = random.Next(100);
            int thirdPart = random.Next(10000);

            // Format the parts with leading zeros
            string formattedFirstPart = firstPart.ToString().PadLeft(3, '0');
            string formattedSecondPart = secondPart.ToString().PadLeft(2, '0');
            string formattedThirdPart = thirdPart.ToString().PadLeft(4, '0');

            // Concatenate the parts with dashes
            return $"{formattedFirstPart}-{formattedSecondPart}-{formattedThirdPart}";
        }

        //get all authors from database (getAuthors())
        // GET: api/Authors/GetAuthors
        [HttpGet]
        [Route("GetAuthors")]
        public ActionResult<IEnumerable<Author>> GetAuthors()
        {
            // Retrieve all authors from the database using Entity Framework Core
            var authors = _context.Authors.ToList();

            return authors;
        }

        //get all books from database (getBooks())
        [HttpGet]
        [Route("GetBooks")]
        public IActionResult GetBooks()
        {
            // Retrieve all books from the 'titles' table using EF Core
            var books = _context.Titles.ToList();

            return Ok(books);
        }

        //create author in pubs database
        [HttpPost]
        [Route("CreateAuthor")]
        public IActionResult CreateAuthor([FromBody] Author newAuthor)
        {
            // Generate a random AU_ID
            string au_id = GenerateRandomAu_id();

            //address
            if(string.IsNullOrEmpty(newAuthor.address)){
                newAuthor.address = null;
            }
            //city
            if(string.IsNullOrEmpty(newAuthor.city)){
                newAuthor.city = null;
            }
            //state
            if(string.IsNullOrEmpty(newAuthor.state)){
                newAuthor.state = null;
            }
            //zip
            if(string.IsNullOrEmpty(newAuthor.zip)){
                newAuthor.zip = null;
            }

            // Create a new Author object
            var author = new Author
            {
                au_id = au_id,
                au_lname = newAuthor.au_lname,
                au_fname = newAuthor.au_fname,
                phone = newAuthor.phone,
                address = newAuthor.address,
                city = newAuthor.city,
                state = newAuthor.state,
                zip = newAuthor.zip,
                contract = newAuthor.contract //was isContract
            };

            // Add the new Author object to the context
            _context.Authors.Add(author);

            // Save changes to the database
            _context.SaveChanges();

           // return Ok("Author added successfully!!!");
           return Ok(new { message = "Author added successfully!!!" });
        }

        //deletes author from pubs database
        [HttpDelete]
        [Route("DeleteAuthor/{id}")]
        public IActionResult DeleteAuthor(string id)
        {
            // Find the author by id
            var author = _context.Authors.Find(id);
    
            // If the author is not found, return a not found response
            if (author == null)
            {
                return NotFound();
            }

            // Remove the author from the context
            _context.Authors.Remove(author);

            // Save changes to the database
            _context.SaveChanges();

            // Return a success response
            return Ok(new { message = "Deleted Successfully" });
        }


        //edits/updates author in pubs database
        // Edits/updates author in pubs database
        [HttpPut]
        [Route("UpdateAuthor/{id}")]
        public IActionResult UpdateAuthor(string id, Author updatedAuthor)
        {
            // Find the author by id
            var author = _context.Authors.Find(id);

            // If the author is not found, return a not found response
            if (author == null)
            {
                return NotFound();
            }

            // Update the author's properties
            author.au_fname = updatedAuthor.au_fname;
            author.au_lname = updatedAuthor.au_lname;
            author.phone = updatedAuthor.phone;
            //address
            if(!string.IsNullOrEmpty(updatedAuthor.address)){
                author.address = updatedAuthor.address;
            }
            else{
                author.address = null;
            }
            //city
            if(!string.IsNullOrEmpty(updatedAuthor.city)){
                author.city = updatedAuthor.city;
            }
            else{
                author.city = null;
            }
            //state
            if(!string.IsNullOrEmpty(updatedAuthor.state)){
                author.state = updatedAuthor.state;
            }
            else{
                author.state = null;
            }
            //zip
            if(!string.IsNullOrEmpty(updatedAuthor.zip)){
                author.zip = updatedAuthor.zip;
            }
            else{
                author.zip = null;
            }
            author.contract = updatedAuthor.contract;

            try
            {
                // Save changes to the database
                _context.SaveChanges();

                // Return a success response
                return Ok(new { message = "Updated Successfully" });
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the update process
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating author: " + ex.Message);
            }
        }
    }
}