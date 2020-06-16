import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('MovieService ->', () => {
  let service: MovieService;
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
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Function getMovies ->', () => {
    it('should call http get', () => {
      service.getMovies();
      expect(httpClient.get).toHaveBeenCalled();
    });
  })


});
