using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Security.AccessControl;
using Newtonsoft.Json;//for json serialization and deserialization
using Server.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]//change this to change routes
    [ApiController]

    public class TodoAppController : ControllerBase//change this to change routes
    {
        private IConfiguration _configuration ;//used to get database connection details?
        public TodoAppController(IConfiguration configuration)
        {
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
        [HttpGet]
        [Route("GetAuthors")]
        public JsonResult GetAuthors()
        {
            string query = "select * from authors";
            DataTable table = new DataTable();
            string? sqlDatasource = _configuration.GetConnectionString("pubsDBCon");
            SqlDataReader myReader;

            using(SqlConnection myCon=new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                /* This code executes my getAuthors sql command to my pubs
                database and loads the result (all authors) into a 'DataTable' */
                using(SqlCommand myCommand = new SqlCommand(query,myCon))
                {
                    myReader=myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            // Log the number of rows returned by the query
            //Console.WriteLine($"Number of rows returned from database: {table.Rows.Count}");

            return new JsonResult(table);
        }

        //get all books from database (getBooks())
        [HttpGet]
        [Route("GetBooks")]
        public JsonResult GetBooks()
        {
            string query = "select * from titles";
            DataTable table = new DataTable();
            string? sqlDatasource = _configuration.GetConnectionString("pubsDBCon");
            SqlDataReader myReader;

            using(SqlConnection myCon=new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                /* This code executes my getAuthors sql command to my pubs
                database and loads the result (all authors) into a 'DataTable' */
                using(SqlCommand myCommand = new SqlCommand(query,myCon))
                {
                    myReader=myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //create author in pubs database
        [HttpPost]
        [Route("CreateAuthor")]
        public JsonResult CreateAuthor([FromForm] Author newAuthor){
            string au_id = GenerateRandomAu_id();
            int isContract = (newAuthor.contract.ToLower() == "true") ? 1 : 0;//may need to change this a bit
            string query = "INSERT INTO authors VALUES(@au_id, @au_lname, @au_fname, @phone, @address, @city, @state, @zip, @contract)";
            DataTable table = new DataTable();
            string? sqlDatasource = _configuration.GetConnectionString("pubsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@au_id", au_id);
                    myCommand.Parameters.AddWithValue("@au_lname", newAuthor.au_lname);
                    myCommand.Parameters.AddWithValue("@au_fname", newAuthor.au_fname);
                    myCommand.Parameters.AddWithValue("@phone", newAuthor.phone);
                    myCommand.Parameters.AddWithValue("@address", newAuthor.address);
                    myCommand.Parameters.AddWithValue("@city", newAuthor.city);
                    myCommand.Parameters.AddWithValue("@state", newAuthor.state);
                    myCommand.Parameters.AddWithValue("@zip", newAuthor.zip);
                    myCommand.Parameters.AddWithValue("@contract", isContract);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Author added successfully!!!");
        }

        //deletes author from pubs database
        [HttpDelete]
        [Route("DeleteAuthor/{id}")]
        public JsonResult DeleteAuthor(string id)
        {
            string query = "DELETE FROM titleauthor WHERE au_id = @id delete from authors where au_id=@id";
            DataTable table = new DataTable();
            string? sqlDatasource = _configuration.GetConnectionString("pubsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }



        //edits/updates author in pubs database
        [HttpPut]
        [Route("UpdateAuthor/{id}")]
        public JsonResult UpdateAuthor(string id, Author updatedAuthor)
        {
            int isContract = (updatedAuthor.contract.ToLower() == "true") ? 1 : 0;//may need to change this a bit
            string query = "UPDATE authors SET au_fname = @au_fname, au_lname = @au_lname, phone = @phone, address = @address, city = @city, state = @state, zip = @zip, contract = @contract WHERE au_id = @au_id";
            DataTable table = new DataTable();
            string? sqlDatasource = _configuration.GetConnectionString("pubsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@au_fname", updatedAuthor.au_fname);
                    myCommand.Parameters.AddWithValue("@au_lname", updatedAuthor.au_lname);
                    myCommand.Parameters.AddWithValue("@phone", updatedAuthor.phone);
                    myCommand.Parameters.AddWithValue("@address", updatedAuthor.address);
                    myCommand.Parameters.AddWithValue("@city", updatedAuthor.city);
                    myCommand.Parameters.AddWithValue("@state", updatedAuthor.state);
                    myCommand.Parameters.AddWithValue("@zip", updatedAuthor.zip);
                    myCommand.Parameters.AddWithValue("@contract", isContract);
                    myCommand.Parameters.AddWithValue("@au_id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }





    }
}