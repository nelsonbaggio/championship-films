import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url: string = 'movies'

  constructor(private http: HttpClient) { }

  getMovies = (): Observable<Array<Movie>> => this.http.get<Array<Movie>>(this.url);

  generateChampionship = (selectedMovies: Array<Movie>): Observable<Array<Movie>> => {
    return this.http.post<Array<Movie>>(this.url, selectedMovies);
  }
}
