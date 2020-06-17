import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly breakpoint = 798;
  private readonly maxSelections = 8;
  private readonly rowHeightSmallScreen = "6:1";
  private readonly rowHeightLargeScreen = "2:1";
  private readonly columnsSmallScreen = 1;
  private readonly columnsLargeScreen = 4;

  subcription: Subscription = new Subscription();
  allFilms: Array<Film>;
  selectedFilms: Array<Film> = [];
  columns: number;
  rowHeight: string;



  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.columns = (window.innerWidth <= this.breakpoint) ?
      this.columnsSmallScreen : this.columnsLargeScreen;
    this.rowHeight = (window.innerWidth <= this.breakpoint) ?
      this.rowHeightSmallScreen : this.rowHeightLargeScreen;
    this.subcription = this.filmService.getFilms().subscribe(films => {
      this.allFilms = films;
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  changeSelection = (choice: boolean, film: Film): void => {
    choice ? this.selectFilm(film) : this.deselectFilm(film.id);
  }

  isFullSelection = (film: Film): boolean => {
    const isNotSelected = this.selectedFilms.every(item => item.id !== film.id);
    return isNotSelected && this.selectedFilms.length === this.maxSelections;
  }

  onResize = (event: any): void => {
    this.columns = (event.target.innerWidth <= this.breakpoint) ?
      this.columnsSmallScreen : this.columnsLargeScreen;
    this.rowHeight = (event.target.innerWidth <= this.breakpoint) ?
      this.rowHeightSmallScreen : this.rowHeightLargeScreen;
  }

  generateChampionship = (): void => {
    this.filmService.generateChampionship(this.selectedFilms).subscribe(response => {
      console.log(response);
    });
  }

  private selectFilm = (film: Film): void => {
    this.selectedFilms.push(film);
  }

  private deselectFilm = (id: string): void => {
    this.selectedFilms = this.selectedFilms
      .map(film => film.id !== id ? film : null)
      .filter(film => !!film);
  }

}
