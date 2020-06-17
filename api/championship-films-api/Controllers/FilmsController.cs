using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using championship_films_api.Models;
using championship_films_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace championship_films_api.Controllers
{
  [Route("api/films")]
  [ApiController]
  [ExcludeFromCodeCoverage]
  public class FilmsController
  {
    private readonly IFilmService _filmService;

    public FilmsController(IFilmService filmService)
    {
      _filmService = filmService;
    }
    [HttpGet]
    public Task<List<Film>> GetFilms() => _filmService.GetFilmsAsync();

  }
}