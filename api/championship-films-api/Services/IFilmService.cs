using System.Collections.Generic;
using System.Threading.Tasks;
using championship_films_api.Models;

namespace championship_films_api.Services
{
  public interface IFilmService
  {
    Task<List<Film>> GetFilmsAsync();
    Task<ChampionshipFilmsResult> HandleFilmsAsync(List<Film> films);
  }
}