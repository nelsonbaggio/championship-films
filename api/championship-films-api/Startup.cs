using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using championship_films_api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
                              builder.WithOrigins("http://localhost:4200");
                            });
        });
      services.AddControllers();
      services.AddHttpClient("copafilmes", c =>
      {
        c.BaseAddress = new Uri("http://copafilmes.azurewebsites.net/");
      });
      services.AddSingleton<IFilmService, FilmService>();
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
