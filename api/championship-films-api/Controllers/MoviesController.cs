using System.Collections.Generic;
using System.Threading.Tasks;
using championship_films_api.Models;
using championship_films_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace championship_films_api.Controllers
{
  [Route("api/movies")]
  [ApiController]
  public class MoviesController
  {
    private readonly IMovieService _service;

    public MoviesController(IMovieService service)
    {
      this._service = service;
    }
    [HttpGet]
    public Task<List<Movie>> GetMovies() => this._service.GetMoviesAsync();

    [HttpPost]
    public List<Movie> GenerateChampionship([FromBody] List<Movie> movies)
    {
      return this._service.GenerateChampionship(movies);
    }
  }
}