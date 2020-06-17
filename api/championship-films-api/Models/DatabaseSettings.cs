namespace championship_films_api.Models
{
  public class DatabaseSettings : IDatabaseSettings
  {
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
    public string ChampionshipFilmsResultCollectionName { get; set; }

  }

  public interface IDatabaseSettings
  {
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
    string ChampionshipFilmsResultCollectionName { get; set; }
  }
}