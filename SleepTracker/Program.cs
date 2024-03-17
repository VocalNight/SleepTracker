using Microsoft.EntityFrameworkCore;
using SleepTracker.Context;
using SleepTracker.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SleepContext>(opt =>
opt.UseSqlServer(builder.Configuration.GetConnectionString("Database")));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var db = scope.ServiceProvider.GetRequiredService<SleepContext>();
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.MapPost("/tracker", async ( SleepRecordModel item, SleepContext db ) =>
{
    db.SleepRecords.Add(item);
    await db.SaveChangesAsync();

    return (Results.Created($"/tracker/{item.Id}", item));
});

app.MapGet("/tracker", async ( SleepContext db ) =>
    await db.SleepRecords.ToListAsync());

app.MapDelete("/tracker/{id}", async ( int id, SleepContext db ) =>
{
    if (await db.SleepRecords.FindAsync(id) is SleepRecordModel item)
    {
        db.SleepRecords.Remove(item);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});




app.UseCors("AllowAngularDev");
app.Run();

