import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly breakpoint = 798;
  private readonly maxSelections = 8;

  subcription: Subscription = new Subscription();
  allMovies: Array<Movie>;
  selectedMovies: Array<Movie> = [];
  columns: number;
  rowHeight: string;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.columns = (window.innerWidth <= this.breakpoint) ? 1 : 4;
    this.rowHeight = (window.innerWidth <= this.breakpoint) ? "6:1" : "2:1";
    this.subcription = this.movieService.getMovies().subscribe(movies => {
      this.allMovies = movies;
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  changeSelection = (choice: boolean, movie: Movie): void => {
    choice ? this.selectMovie(movie) : this.deselectMovie(movie.id);
  }

  isFullSelection = (movie: Movie): boolean => {
    const isNotSelected = this.selectedMovies.every(item => item.id !== movie.id);
    return isNotSelected && this.selectedMovies.length === this.maxSelections;
  }

  onResize = (event: any): void => {
    this.columns = (event.target.innerWidth <= this.breakpoint) ? 1 : 4;
    this.rowHeight = (event.target.innerWidth <= this.breakpoint) ? "6:1" : "2:1";
  }

  generateChampionship = (): void => {
    this.movieService.generateChampionship(this.selectedMovies);
  }

  private selectMovie = (movie: Movie): void => {
    this.selectedMovies.push(movie);
  }

  private deselectMovie = (id: string): void => {
    this.selectedMovies = this.selectedMovies
      .map(movie => movie.id !== id ? movie : null)
      .filter(movie => !!movie);
  }

}
