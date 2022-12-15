import { Injectable } from '@angular/core';
import { Snake } from '../models/snake';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  snakes: Snake[] = [
    { start: 26, destination: 0 },
    { start: 20, destination: 8 },
    { start: 16, destination: 3 },
    { start: 18, destination: 6 },

  ]

  ladders: Ladder[] = [
    { start: 4, destination: 7 },
    { start: 19, destination: 28 },
    { start: 10, destination: 25 },
    { start: 2, destination: 21 },

  ]

  players: Player[] = [
    { id: 1, isActive: false, position: 1 },
    { id: 2, isActive: false, position: 1 },
  ]


  //play button enabling
  // private _player1ButtonEnable: boolean = true;
  // public get player1ButtonEnable(): boolean {
  //   return this._player1ButtonEnable;
  // }
  // public set player1ButtonEnable(value: boolean) {
  //   this._player1ButtonEnable = value;
  // }

  //board= new Array(30).fill(0);
  board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

  rollDice(): number {
    return Math.floor(Math.random() * (7 - 1) + 1);
  }

  // function filterById(obj) {
  //   if (Number.isFinite(obj.id) && obj.id !== 0) 
  //   {
  //     return true
  //   } 
  //   countInvalidEntries++
  //   return false;
  // }

  // let arrayById = array.filter(filterById);

  move(dice: number, index: number) {

    //check if dice move is valid
    if (this.players[index].position + dice > this.board.length) {
      console.log("dice number greater than postions available on board");
      return;
    }
    else {
      let position = this.players[index].position + dice;
      this.players[index].position = this.players[index].position + dice;

      //snakes
      let snakeExists = false;
      let snakeIndex = 0;
      let snakeCount = 0;
      this.snakes.forEach(function (snake) {
        snakeCount = snakeCount + 1;
        if (snake.start == position) {
          snakeExists = true;
          console.log("Found a snake at " + position);
          snakeIndex = snakeCount - 1;
        }

      });
      //ladder
      let ladderExists = false;
      let ladderIndex = 0;
      let ladderCount = 0;
      this.ladders.forEach(function (ladder) {
        ladderCount = ladderCount + 1;
        if (ladder.start == position) {
          ladderExists = true;
          console.log("Found a ladder at " + position);
          ladderIndex = ladderCount - 1;
        }
      });

      if (snakeExists) {
        this.players[index].position = this.snakes[snakeIndex].destination;
      }
      if (ladderExists) {
        this.players[index].position = this.ladders[ladderIndex].destination;
      }
      //game won
      if (this.players[index].position == this.board.length) {
        console.log("Game won by " + this.players[index].id);
        this.players.forEach(player => {
          player.isActive = false;
        });
      }
    }

    // if(this.snakes.filter((snake) => snake.start == this.players[index].position)){ }
    // if(this.ladders.filter((ladder) => ladder.start == this.players[index].position)){ }
  }

  play(player: Player, dice: number) {
    console.log(player);
    let index = this.players.indexOf(player);
    this.players[index].isActive = false;

    // if(player.position+1==this.board.length){
    //   console.log("Game won by "+ player.id)
    //   return;
    // }

    //IsActive
    if (this.players.length == index + 1) {
      this.players[0].isActive = true;
    } else {
      this.players[index + 1].isActive = true;
    }
    this.move(dice, index);

  }

  reset() {
    this.players.forEach(player => {
      player.isActive = false;
      player.position = 1;
    });
    this.players[0].isActive = true;
  }

}
