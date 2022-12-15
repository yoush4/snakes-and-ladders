import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'snakes-and-ladders';
  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    //console.log(this.gameService.board);
  }

}
