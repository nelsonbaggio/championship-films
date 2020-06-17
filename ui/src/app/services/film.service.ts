import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Film } from '../models/film';
import { ChampionshipResult } from '../models/championship-result';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private url: string = 'films'

  constructor(private http: HttpClient) { }

  getFilms = (): Observable<Array<Film>> => this.http.get<Array<Film>>(this.url);

}
