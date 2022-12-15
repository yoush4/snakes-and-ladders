import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  constructor(private gameService:GameService){}
  board=this.gameService.board;
  n=6;
  players = this.gameService.players;
  snakes=this.gameService.snakes;
  ladders=this.gameService.ladders;

  ngOnInit(){
    console.log(this.players);
  }

}
