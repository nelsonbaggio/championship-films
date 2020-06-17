import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionshipService } from 'src/app/services/championship.service';
import { ChampionshipResult } from 'src/app/models/championship-result';
import { mergeMap, switchMap } from 'rxjs/operators/';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  result: ChampionshipResult;

  constructor(private route: ActivatedRoute, private service: ChampionshipService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.getResult(params.get('id'));
      })
    ).subscribe(result => {
      this.result = result;
    });

    // this.route.queryParams
    //   .pipe(mergeMap(params => {
    //     return this.service.getResult(params['id'])
    //   }))
    //   .subscribe(result => {
    //     this.result = result;
    //   });
  }
}
