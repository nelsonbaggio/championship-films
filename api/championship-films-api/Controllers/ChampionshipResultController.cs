using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using championship_films_api.Models;
using championship_films_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace championship_films_api.Controllers
{
  [Route("api/championship-result")]
  [ApiController]
  [ExcludeFromCodeCoverage]
  public class ChampionshipResultController
  {
    private readonly IFilmService _filmService;
    private readonly IChampionshipFilmsResultService _resultService;

    public ChampionshipResultController(IFilmService filmService, IChampionshipFilmsResultService resultService)
    {
      _filmService = filmService;
      _resultService = resultService;
    }

    [HttpPost]
    public Task<ChampionshipFilmsResult> GenerateChampionship([FromBody] List<Film> films)
    {
      return _filmService.HandleFilmsAsync(films);
    }

    [HttpGet("{id?}")]
    public ChampionshipFilmsResult GetChampionshipFilmsResult(string id) =>
      _resultService.GetChampionshipFilmsResultAsync(id);
  }
}