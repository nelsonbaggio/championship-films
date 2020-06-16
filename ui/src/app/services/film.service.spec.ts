import { TestBed } from '@angular/core/testing';

import { FilmService } from './film.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('FilmService ->', () => {
  let service: FilmService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [{
        provide: HttpClient, useValue: httpClient
      }]
    });
    service = TestBed.inject(FilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Function getFilms ->', () => {
    it('should call http get', () => {
      service.getFilms();
      expect(httpClient.get).toHaveBeenCalled();
    });
  })


});
