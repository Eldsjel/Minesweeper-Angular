import { Component, OnInit } from '@angular/core';
import { MineService } from '../mine.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardArray: number[];
  itemArray: string[];
  gameOver: boolean;
  gameStatus: string;

  flagIcon = 'assets/flag.ico';
  mineIcon = 'assets/mine.ico';

  constructor(private mineService: MineService) {}

  ngOnInit(): void {
    this.initBoard();
  }

  /**
   * Initializes the game board data
   */
  initBoard() {
    this.boardArray = [];
    this.itemArray = [];
    for (let i = 0; i < this.mineService.boardSize * this.mineService.boardSize; i++) {
      this.itemArray[i] = '';
    }
    this.gameOver = false;
    this.gameStatus = '';
  }

  /**
   * Click handler -> uncovers the tile
   * @param index: position of the clicked tile
   */
  clickTile(index) {
    // no click allowed if flag is set or if game is over
    if (this.itemArray[index] === this.flagIcon || this.gameOver) {
      return false;
    }
    // initialize board array on first click (first click must not be a mine)
    if (this.boardArray.length === 0) {
      this.boardArray = this.mineService.getMineArray(index);
    }

    // check if a mine was clicked
    if (this.boardArray[index] === -1) {
      this.itemArray[index] = this.mineIcon;
      this.gameOver = true;
      this.gameStatus = 'GAME OVER';
      return false;
    }

    this.itemArray[index] = 'assets/' + this.boardArray[index] + '.png';

    // uncover neighbors if clicked tile is a 0
    if (this.boardArray[index] === 0) {
      const neighbors = this.mineService.getNeighbors(index);
      for (let i = 0; i < neighbors.length; i++) {
        if (this.itemArray[neighbors[i]] === '') {
          this.clickTile(neighbors[i]);
        }
      }
    }
    // check if all non-mine-fields are uncovered
    if (this.checkIfGameIsWon()) {
      this.gameOver = true;
      this.gameStatus = 'YOU WON! CONGRATULATIONS :)';
    }
  }

  /**
   * Marks/unmarks the tile with a flag, preventing/enabling click events
   * @param index: position of the clicked tile
   */
  markTile(index) {
    if (this.gameOver) {
      return false;
    }
    const elem = this.itemArray[index];
    if (elem === '') {
      this.itemArray[index] = this.flagIcon;
    } else if (elem === this.flagIcon) {
      this.itemArray[index] = '';
    }
    // prevent standard browser reaction to right mouse click
    return false;
  }

  /**
   * Checks if all non-mine-fields are uncovered
   */
  checkIfGameIsWon(): boolean {
    for (let i = 0; i < this.boardArray.length; i++) {
      if (this.boardArray[i] === -1) {
        continue;
      }
      if (this.boardArray[i] !== -1 && this.itemArray[i] === '' ) {
        return false;
      }
    }
    return true;
  }

}
