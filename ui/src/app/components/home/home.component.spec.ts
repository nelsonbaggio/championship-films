import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FilmService } from 'src/app/services/film.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChampionshipService } from 'src/app/services/championship.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('HomeComponent ->', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const oneFilm = { id: '1', titulo: '300', ano: 2007, nota: 10.0 };
  const filmService = jasmine.createSpyObj('filmService', {
    'getFilms': of([oneFilm])
  });
  const championshipService = jasmine.createSpyObj('championshipService', {
    'generateChampionship': of({ id: '1' }),
  });
  const router = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Router,
        useValue: router
      }, {
        provide: FilmService,
        useValue: filmService
      },
      {
        provide: ChampionshipService,
        useValue: championshipService
      }],
      imports: [
        MatCardModule,
        MatGridListModule,
        MatCheckboxModule
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Function ngOnInit ->', () => {
    it('should call getFilms from FilmService and set allFilms with the result', () => {
      component.ngOnInit();
      expect(component.allFilms.length).toBe(1);
      expect(component.allFilms).toContain(oneFilm);
    });
  })


  describe('Function changeSelection ->', () => {
    it('should add selected film when call changeSelection whith choice true', () => {
      component.changeSelection(true, oneFilm)
      expect(component.selectedFilms.length).toBe(1);
      expect(component.selectedFilms[0]).toBe(oneFilm);
    });

    it('should remove selected film when call changeSelection whith choice false', () => {
      const anotherOne = { id: '2', titulo: 'Up', ano: 2007, nota: 10.0 };
      component.selectedFilms = [oneFilm, anotherOne]
      component.changeSelection(false, oneFilm);
      expect(component.selectedFilms.length).toBe(1);
      expect(component.selectedFilms[0]).toBe(anotherOne);
    });
  })


  describe('Property columns ->', () => {
    it('should set to 1 when onResize is called with innerWidth less 798 on event', () => {
      component.onResize({ target: { innerWidth: 797 } });
      expect(component.columns).toBe(1);
    });

    it('should set to 4 when onResize is called with innerWidth bigger then 798 on event', () => {
      component.onResize({ target: { innerWidth: 799 } });
      expect(component.columns).toBe(4);
    });
  })


  describe('Property rowHeight ->', () => {
    it('should set to 6:1 when onResize is called with innerWidth less 798 on event', () => {
      component.onResize({ target: { innerWidth: 797 } });
      expect(component.rowHeight).toBe('6:1');
    });

    it('should set to 2:1 when onResize is called with innerWidth bigger then 798 on event', () => {
      component.onResize({ target: { innerWidth: 799 } });
      expect(component.rowHeight).toBe('2:1');
    });
  })

  describe('Function generateChampionship ->', () => {
    it('should call service and Router navigate', () => {
      expect(championshipService.generateChampionship)
        .toHaveBeenCalledWith((component.selectedFilms));
      component.generateChampionship();
      expect(router.navigate).toHaveBeenCalledWith(['/podium', { id: '1' }]);
    });
  })


  describe('Function isFullSelection ->', () => {

    const selectedMock = [
      { id: '1', titulo: 'Film 1', ano: 2007, nota: 10.0 },
      { id: '2', titulo: 'Film 2', ano: 2007, nota: 10.0 },
      { id: '3', titulo: 'Film 3', ano: 2007, nota: 10.0 },
      { id: '4', titulo: 'Film 4', ano: 2007, nota: 10.0 },
      { id: '5', titulo: 'Film 5', ano: 2007, nota: 10.0 },
      { id: '6', titulo: 'Film 6', ano: 2007, nota: 10.0 },
      { id: '7', titulo: 'Film 7', ano: 2007, nota: 10.0 },
      { id: '8', titulo: 'Film 8', ano: 2007, nota: 10.0 }
    ];

    it('should true when unselected film and max selection', () => {
      component.selectedFilms = selectedMock;
      expect(component.isFullSelection({
        id: '9',
        titulo: 'Film 8',
        ano: 2007,
        nota: 10.0
      })).toBeTrue();
    });

    it('should false selected film and max selection', () => {
      component.selectedFilms = selectedMock;
      expect(component.isFullSelection({
        id: '1',
        titulo: 'Film 1',
        ano: 2007,
        nota: 10.0
      })).toBeFalse();
    });

    it('should false when unselected film and less max selection', () => {
      component.selectedFilms = [];
      expect(component.isFullSelection({
        id: '9',
        titulo: 'Film 8',
        ano: 2007,
        nota: 10.0
      })).toBeFalse();
    });

    it('should false when selected film and less max selection', () => {
      component.selectedFilms = [];
      expect(component.isFullSelection({
        id: '1',
        titulo: 'Film 1',
        ano: 2007,
        nota: 10.0
      })).toBeFalse();
    });

  })

});
