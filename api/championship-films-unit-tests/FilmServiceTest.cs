using Xunit;
using System;

using championship_films_api.Services;
using System.Collections.Generic;
using championship_films_api.Models;

namespace championship_films_unit_tests
{
  public class FilmsServiceTest
  {
    private readonly FilmService _service;

    public FilmsServiceTest()
    {
      _service = new FilmService(null);
    }

    [Fact]
    public void ShouldDeterminateAChampionByChangeAlphabeticOrder()
    {
      var deadPool = new Film { Id = "tt5463162", Title = "Deadpool", Year = 2018, Rating = 8.1f };
      var deadPool2 = new Film { Id = "tt5463162", Title = "Deadpool 2", Year = 2018, Rating = 8.1f };
      var result = _service.HandleFilms(new List<Film> { deadPool2, deadPool });
      Assert.Equal(deadPool, result[0]);
      Assert.Equal(deadPool2, result[1]);
    }

    [Fact]
    public void ShouldDeterminateAChampionByKeepAlphabeticOrder()
    {
      var deadPool = new Film { Id = "tt5463162", Title = "Deadpool", Year = 2018, Rating = 8.1f };
      var deadPool2 = new Film { Id = "tt5463162", Title = "Deadpool 2", Year = 2018, Rating = 8.1f };
      var result = _service.HandleFilms(new List<Film> { deadPool, deadPool2 });
      Assert.Equal(deadPool, result[0]);
      Assert.Equal(deadPool2, result[1]);
    }

    [Fact]
    public void ShouldDeterminateAChampionInAHappyPath()
    {

      var secondPlace = new Film { Id = "tt3606756", Title = "Os Incríveis 2", Year = 2018, Rating = 8.5f };
      var firstPlace = new Film { Id = "tt4154756", Title = "Vingadores: Guerra Infinita", Year = 2018, Rating = 8.8f };
      var _films = new List<Film>
      {
        secondPlace,
        new Film { Id = "tt4881806", Title = "Jurassic World: Reino Ameaçado", Year = 2018, Rating = 6.7f },
        new Film { Id = "tt5164214", Title = "Oito Mulheres e um Segredo", Year = 2018, Rating = 6.3f },
        new Film { Id = "tt7784604", Title = "Hereditário", Year = 2018, Rating = 7.8f },
        firstPlace,
        new Film { Id = "tt5463162", Title = "Deadpool 2", Year = 2018, Rating = 8.1f },
        new Film { Id = "tt3778644", Title = "Han Solo: Uma História Star Wars", Year = 2018, Rating = 7.2f },
        new Film { Id = "tt3501632", Title = "Thor: Ragnarok", Year = 2017, Rating = 7.9f },
      };

      var result = _service.HandleFilms(_films);
      Assert.Equal(firstPlace, result[0]);
      Assert.Equal(secondPlace, result[1]);
    }

    [Fact]
    public void ShouldReturnErrorWhenNumberOfFilmsIsNotEven()
    {
      Assert.Throws<InvalidOperationException>(() =>
      {
        _service.HandleFilms(new List<Film> {
          new Film {
            Id = "tt7784604",
            Title = "Hereditário",
            Year = 2018,
            Rating = 7.8f
          }
        });
      });
    }
  }
}
