using Xunit;
using System;

using championship_films_api.Services;
using System.Collections.Generic;
using championship_films_api.Models;
using System.Threading.Tasks;
using NSubstitute;
using Moq;

namespace championship_films_unit_tests
{
  public class FilmsServiceTest
  {
    private readonly Mock<IChampionshipFilmsResultService> resultServiceMock;
    private readonly FilmService target;

    public FilmsServiceTest()
    {
      resultServiceMock = new Mock<IChampionshipFilmsResultService>();
      resultServiceMock.Setup(x => x.Create(It.IsAny<ChampionshipFilmsResult>()))
                       .ReturnsAsync((ChampionshipFilmsResult)null);
      target = new FilmService(null, resultServiceMock.Object);
    }

    [Fact]
    public async Task ShouldDeterminateAChampionByChangeAlphabeticOrderAsync()
    {
      var deadPool = new Film { Id = "tt5463162", Title = "Deadpool", Year = 2018, Rating = 8.1f };
      var deadPool2 = new Film { Id = "tt5463162", Title = "Deadpool 2", Year = 2018, Rating = 8.1f };
      var result = await target.HandleFilmsAsync(new List<Film> { deadPool2, deadPool });
      Assert.Equal(deadPool, result.FirstPlace);
      Assert.Equal(deadPool2, result.SecondPlace);
    }

    [Fact]
    public async Task ShouldDeterminateAChampionByKeepAlphabeticOrderAsync()
    {
      var deadPool = new Film { Id = "tt5463162", Title = "Deadpool", Year = 2018, Rating = 8.1f };
      var deadPool2 = new Film { Id = "tt5463162", Title = "Deadpool 2", Year = 2018, Rating = 8.1f };
      var result = await target.HandleFilmsAsync(new List<Film> { deadPool, deadPool2 });
      Assert.Equal(deadPool, result.FirstPlace);
      Assert.Equal(deadPool2, result.SecondPlace);
    }

    [Fact]
    public async Task ShouldDeterminateAChampionInAHappyPathAsync()
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

      var result = await target.HandleFilmsAsync(_films);
      Assert.Equal(firstPlace, result.FirstPlace);
      Assert.Equal(secondPlace, result.SecondPlace);
    }

    [Fact]
    public void ShouldReturnErrorWhenNumberOfFilmsIsNotEven()
    {
      Assert.ThrowsAsync<InvalidOperationException>(async () =>
      {
        await target.HandleFilmsAsync(new List<Film> {
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
