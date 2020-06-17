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
    private readonly IChampionshipFilmsResultService _resultService;

    public FilmService(IHttpClientFactory clientFactory,
      IChampionshipFilmsResultService resultService)
    {
      _clientFactory = clientFactory;
      _resultService = resultService;
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

    public async Task<ChampionshipFilmsResult> HandleFilmsAsync(List<Film> films)
    {
      films.Sort((a, b) => a.Title.CompareTo(b.Title));
      var final = GenerateChampionship(films);
      ChampionshipFilmsResult result = new ChampionshipFilmsResult
      {
        Id = Guid.NewGuid().ToString(),
        FirstPlace = final[0],
        SecondPlace = final[1],
      };
      await _resultService.Create(result);
      return result;
    }

    private List<Film> GenerateChampionship(List<Film> films)
    {
      Validate(films);

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

    private void Validate(List<Film> films)
    {
      if (films.Count % 2 != 0)
      {
        throw new InvalidOperationException("It is only possible to play with an even number of films");
      }
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
      return Tuple.Create(home, visiting);
    }

  }
}