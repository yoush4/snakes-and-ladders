import { Player } from './../models/player';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.players[0].isActive = true;
  }

  //position:number=0;
  dice: number = 0;
  //isEnabled:boolean=this.gameService.player1ButtonEnable;
  players = this.gameService.players;
  //board=this.gameService.board;
  //n=6;

  play(player: Player) {
    this.dice = this.gameService.rollDice();
    this.gameService.play(player, this.dice);

  }

  reset() {
    this.gameService.reset();
    this.dice = 0;
  }

}