using System.Threading.Tasks;
using championship_films_api.Models;

namespace championship_films_api.Services
{
  public interface IChampionshipFilmsResultService
  {
    Task<ChampionshipFilmsResult> Create(ChampionshipFilmsResult result);
    ChampionshipFilmsResult GetChampionshipFilmsResultAsync(string id);
  }

}