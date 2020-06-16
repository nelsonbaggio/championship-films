using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using championship_films_api.Models;

namespace championship_films_api.Services
{
  public class MovieService : IMovieService
  {

    private readonly IHttpClientFactory _clientFactory;
    public MovieService(IHttpClientFactory clientFactory)
    {
      this._clientFactory = clientFactory;
    }
    public async Task<List<Movie>> GetMoviesAsync()
    {
      var client = _clientFactory.CreateClient("copafilmes");
      var request = new HttpRequestMessage(HttpMethod.Get, "api/filmes");
      var response = await client.SendAsync(request);
      if (response.IsSuccessStatusCode)
      {
        using var responseStream = await response.Content.ReadAsStreamAsync();
        List<Movie> lists = await JsonSerializer.DeserializeAsync<List<Movie>>(responseStream);
        return lists;
      }
      return new List<Movie>();
    }

    public List<Movie> GenerateChampionship(List<Movie> movies)
    {

      if (movies.Count % 2 != 0)
      {
        throw new Exception("It is only possible to play with an even number of movies");
      }

      if (movies.Count == 2)
      {
        var result = Play(movies[0], movies[1]);
        return new List<Movie>
        {
          result.Item1,
          result.Item2
        };
      }

      var round = new List<Movie>();
      for (int i = 0; i < movies.Count / 2; i++)
      {
        round.Add(Play(movies[i], movies[movies.Count - 1 - i]).Item1);
      }
      return GenerateChampionship(round);
    }

    private Tuple<Movie, Movie> Play(Movie home, Movie visiting)
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