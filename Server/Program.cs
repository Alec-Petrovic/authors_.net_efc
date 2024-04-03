using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using Server.Models;
var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddControllers();

// Add DbContext configuration
builder.Services.AddDbContext<PubsContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("pubsDBCon")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JSON Serializer

builder.Services.AddControllers().AddNewtonsoftJson(options=>
options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore).AddNewtonsoftJson(
    options=>options.SerializerSettings.ContractResolver=new DefaultContractResolver());

 
var app = builder.Build();

/*Enable CORS (allows communication with angular), 
    apparently bad practice for production */
app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();