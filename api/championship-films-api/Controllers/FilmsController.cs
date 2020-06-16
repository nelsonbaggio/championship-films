using System.Collections.Generic;
using System.Threading.Tasks;
using championship_films_api.Models;
using championship_films_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace championship_films_api.Controllers
{
  [Route("api/films")]
  [ApiController]
  public class FilmsController
  {
    private readonly IFilmService _service;

    public FilmsController(IFilmService service)
    {
      this._service = service;
    }
    [HttpGet]
    public Task<List<Film>> GetFilms() => this._service.GetFilmsAsync();

    [HttpPost]
    public List<Film> GenerateChampionship([FromBody] List<Film> films)
    {
      return this._service.GenerateChampionship(films);
    }
  }
}