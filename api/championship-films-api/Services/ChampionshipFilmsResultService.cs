using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using championship_films_api.Models;
using MongoDB.Driver;

namespace championship_films_api.Services
{

  [ExcludeFromCodeCoverage]
  public class ChampionshipFilmsResultService : IChampionshipFilmsResultService
  {

    private readonly IMongoCollection<ChampionshipFilmsResult> collection;
    public ChampionshipFilmsResultService(IDatabaseSettings settings, IMongoClient client)
    {
      var database = client.GetDatabase(settings.DatabaseName);
      collection = database.GetCollection<ChampionshipFilmsResult>(settings.ChampionshipFilmsResultCollectionName);
    }

    public async Task<ChampionshipFilmsResult> Create(ChampionshipFilmsResult result)
    {
      result.CreateAt = DateTime.UtcNow;
      await collection.InsertOneAsync(result);
      return result;
    }

    public ChampionshipFilmsResult GetChampionshipFilmsResultAsync(string id)
    {
      if (id != null)
      {
        return collection.Find(doc => doc.Id.Equals(id)).FirstOrDefault();
      }

      ChampionshipFilmsResult championshipFilmsResult = collection.Find(doc => true).Sort("{ createAt: 1}").Limit(1).Single();
      return championshipFilmsResult;
    }

  }

}