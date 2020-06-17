import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumComponent } from './podium.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ChampionshipService } from 'src/app/services/championship.service';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';

describe('PodiumComponent ->', () => {
  let component: PodiumComponent;
  let fixture: ComponentFixture<PodiumComponent>;
  let activatedRoute = {
    'snapshot': { 'paramMap': convertToParamMap({ id: null }) }
  };
  const championshipService = jasmine.createSpyObj('championshipService', {
    'getResult': of({
      firstPlace: { id: '1', titulo: 'Film 1', ano: 2007, nota: 10.0 },
      secondPlace: { id: '2', titulo: 'Film 2', ano: 2007, nota: 10.0 }
    })
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodiumComponent],
      imports: [
        MatCardModule,
        MatListModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ChampionshipService, useValue: championshipService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Function ngOnInit ->', () => {
    it('should call service with the parameter id', () => {
      spyOn<any>(component['route'].snapshot.paramMap, 'get').and.returnValue(null);
      component.ngOnInit()
      expect(championshipService.getResult).toHaveBeenCalledWith(null);
      expect(component.result.firstPlace.titulo).toEqual('Film 1');
      expect(component.result.secondPlace.titulo).toEqual('Film 2');
    });

    it('should call service with the parameter id', () => {
      spyOn<any>(component['route'].snapshot.paramMap, 'get').and.returnValue('1');
      component.ngOnInit()
      expect(championshipService.getResult).toHaveBeenCalledWith('1');
      expect(component.result.firstPlace.titulo).toEqual('Film 1');
      expect(component.result.secondPlace.titulo).toEqual('Film 2');
    });
  })

});
