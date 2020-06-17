using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace championship_films_api.Models
{
  public class ChampionshipFilmsResult
  {
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string Id { get; set; }

    [BsonElement("firstPlace")]
    public Film FirstPlace { get; set; }

    [BsonElement("secondPlace")]
    public Film SecondPlace { get; set; }

    [BsonElement("createAt")]
    public DateTime CreateAt { get; set; }

  }
}