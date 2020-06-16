using System.Collections.Generic;
using System.Threading.Tasks;
using championship_films_api.Models;

namespace championship_films_api.Services
{
  public interface IMovieService
  {
    Task<List<Movie>> GetMoviesAsync();
    List<Movie> GenerateChampionship(List<Movie> movies);
  }
}