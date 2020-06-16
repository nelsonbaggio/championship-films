using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using championship_films_api.Models;

namespace championship_films_api.Services
{
  public class FilmService : IFilmService
  {

    private readonly IHttpClientFactory _clientFactory;
    public FilmService(IHttpClientFactory clientFactory)
    {
      this._clientFactory = clientFactory;
    }
    public async Task<List<Film>> GetFilmsAsync()
    {
      var client = _clientFactory.CreateClient("copafilmes");
      var request = new HttpRequestMessage(HttpMethod.Get, "api/filmes");
      var response = await client.SendAsync(request);
      if (response.IsSuccessStatusCode)
      {
        using var responseStream = await response.Content.ReadAsStreamAsync();
        List<Film> lists = await JsonSerializer.DeserializeAsync<List<Film>>(responseStream);
        return lists;
      }
      return new List<Film>();
    }

    public List<Film> GenerateChampionship(List<Film> films)
    {

      if (films.Count % 2 != 0)
      {
        throw new Exception("It is only possible to play with an even number of films");
      }

      if (films.Count == 2)
      {
        var result = Play(films[0], films[1]);
        return new List<Film>
        {
          result.Item1,
          result.Item2
        };
      }

      var round = new List<Film>();
      for (int i = 0; i < films.Count / 2; i++)
      {
        round.Add(Play(films[i], films[films.Count - 1 - i]).Item1);
      }
      return GenerateChampionship(round);
    }

    private Tuple<Film, Film> Play(Film home, Film visiting)
    {
      if (home.Rating > visiting.Rating)
      {
        return Tuple.Create(home, visiting);
      }
      else if (home.Rating < visiting.Rating)
      {
        return Tuple.Create(visiting, home);
      }
      else if (String.Compare(home.Title, visiting.Title) < 0)
      {
        return Tuple.Create(home, visiting);
      }
      else if (String.Compare(home.Title, visiting.Title) > 0)
      {
        return Tuple.Create(visiting, home); ;
      }
      return Tuple.Create(home, visiting);
    }
  }
}