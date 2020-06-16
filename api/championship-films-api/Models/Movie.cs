using System.Text.Json.Serialization;

namespace championship_films_api.Models
{

  public class Movie
  {

    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("titulo")]
    public string Title { get; set; }

    [JsonPropertyName("ano")]
    public int Year { get; set; }

    [JsonPropertyName("nota")]
    public float Rating { get; set; }
  }
}