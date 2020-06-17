import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionshipService } from 'src/app/services/championship.service';
import { ChampionshipResult } from 'src/app/models/championship-result';
import { switchMap } from 'rxjs/operators/';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  result: ChampionshipResult;

  constructor(private route: ActivatedRoute, private service: ChampionshipService) { }

  ngOnInit(): void {
    this.service.getResult(this.route.snapshot.paramMap.get('id'))
      .subscribe(result => {
        this.result = result;
      });
  }
}
