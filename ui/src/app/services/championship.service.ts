import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChampionshipResult } from '../models/championship-result';
import { Film } from '../models/film';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  private url: string = 'championship-result'

  constructor(private http: HttpClient) { }

  generateChampionship = (selectedFilms: Array<Film>): Observable<ChampionshipResult> => {
    return this.http.post<ChampionshipResult>(this.url, selectedFilms);
  }

  getResult = (id: string) => this.http.get<ChampionshipResult>(`${this.url}/${id || ''}`);
}
