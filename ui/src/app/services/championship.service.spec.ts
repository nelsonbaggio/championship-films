import { TestBed } from '@angular/core/testing';

import { ChampionshipService } from './championship.service';
import { HttpClient } from '@angular/common/http';

describe('ChampionshipService ->', () => {
  const url = 'championship-result';
  let service: ChampionshipService;
  const httpClient = jasmine.createSpyObj('httpClient', ['get', 'post']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(ChampionshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get with /:id when call getResult', () => {
    const parameter = '1';
    service.getResult(parameter)
    expect(httpClient.get).toHaveBeenCalledWith(`${url}/${parameter}`);
  });

  it('should call http get with /:id when call getResult', () => {
    service.getResult(null)
    expect(httpClient.get).toHaveBeenCalledWith(`${url}/`);
  });


  it('should call http post when call generateChampionship', () => {
    const parameter = [
      { id: '1', titulo: 'Film 1', ano: 2007, nota: 10.0 }
    ];
    service.generateChampionship(parameter)
    expect(httpClient.post).toHaveBeenCalledWith(url, parameter);
  });

});
