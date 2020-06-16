import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private url: string = 'films'

  constructor(private http: HttpClient) { }

  getFilms = (): Observable<Array<Film>> => this.http.get<Array<Film>>(this.url);

  generateChampionship = (selectedFilms: Array<Film>): Observable<Array<Film>> => {
    return this.http.post<Array<Film>>(this.url, selectedFilms);
  }
}
