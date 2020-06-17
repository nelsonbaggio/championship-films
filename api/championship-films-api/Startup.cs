using System;
using championship_films_api.Models;
using championship_films_api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace championship_films_api
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    readonly string AllowUI = "_allowUI";

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
        {
          options.AddPolicy(name: AllowUI,
                            builder =>
                            {
                              builder
                              .WithOrigins(Configuration["UIOrigin"])
                              .WithHeaders("accept", "accept-language", "content-type")
                              .AllowAnyMethod();
                            });
        })
      .AddSingleton<IMongoClient>(provider => new MongoClient(Configuration["DatabaseSettings:ConnectionString"]))
      .AddSingleton<IChampionshipFilmsResultService, ChampionshipFilmsResultService>()
      .AddSingleton<IFilmService, FilmService>()
      .Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)))
      .AddSingleton<IDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DatabaseSettings>>().Value)
      .AddControllers();
      services.AddHttpClient("copafilmes", c =>
      {
        c.BaseAddress = new Uri(Configuration["CopaFilmesUri"]);
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseCors(AllowUI);

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
