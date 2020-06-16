import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/services/movie.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('HomeComponent ->', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const oneMovie = { id: '1', titulo: '300', ano: 2007, nota: 10.0 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MovieService, useValue: {
          getMovies: () => of([oneMovie])
        }
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
    it('should call getMovies from MovieService and set allMovies with the result', () => {
      component.ngOnInit();
      expect(component.allMovies.length).toBe(1);
      expect(component.allMovies).toContain(oneMovie);
    });

    // it('should set columns to 1 when window.innerWidth less than 798', () => {
    //   component.ngOnInit();
    //   expect(component.columns).toBe(1);
    // });
  })


  describe('Function changeSelection ->', () => {
    it('should add selected movie when call changeSelection whith choice true', () => {
      component.changeSelection(true, oneMovie)
      expect(component.selectedMovies.length).toBe(1);
      expect(component.selectedMovies[0]).toBe(oneMovie);
    });

    it('should remove selected movie when call changeSelection whith choice false', () => {
      const anotherOne = { id: '2', titulo: 'Up', ano: 2007, nota: 10.0 };
      component.selectedMovies = [oneMovie, anotherOne]
      component.changeSelection(false, oneMovie);
      expect(component.selectedMovies.length).toBe(1);
      expect(component.selectedMovies[0]).toBe(anotherOne);
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


  describe('Function isFullSelection ->', () => {

    const selectedMock = [
      { id: '1', titulo: 'Movie 1', ano: 2007, nota: 10.0 },
      { id: '2', titulo: 'Movie 2', ano: 2007, nota: 10.0 },
      { id: '3', titulo: 'Movie 3', ano: 2007, nota: 10.0 },
      { id: '4', titulo: 'Movie 4', ano: 2007, nota: 10.0 },
      { id: '5', titulo: 'Movie 5', ano: 2007, nota: 10.0 },
      { id: '6', titulo: 'Movie 6', ano: 2007, nota: 10.0 },
      { id: '7', titulo: 'Movie 7', ano: 2007, nota: 10.0 },
      { id: '8', titulo: 'Movie 8', ano: 2007, nota: 10.0 }
    ];

    it('should true when unselected movie and max selection', () => {
      component.selectedMovies = selectedMock;
      expect(component.isFullSelection({
        id: '9',
        titulo: 'Movie 8',
        ano: 2007,
        nota: 10.0
      })).toBeTrue();
    });

    it('should false selected movie and max selection', () => {
      component.selectedMovies = selectedMock;
      expect(component.isFullSelection({
        id: '1',
        titulo: 'Movie 1',
        ano: 2007,
        nota: 10.0
      })).toBeFalse();
    });

    it('should false when unselected movie and less max selection', () => {
      component.selectedMovies = [];
      expect(component.isFullSelection({
        id: '9',
        titulo: 'Movie 8',
        ano: 2007,
        nota: 10.0
      })).toBeFalse();
    });

    it('should false when selected movie and less max selection', () => {
      component.selectedMovies = [];
      expect(component.isFullSelection({
        id: '1',
        titulo: 'Movie 1',
        ano: 2007,
        nota: 10.0
      })).toBeFalse();
    });

  })

});
