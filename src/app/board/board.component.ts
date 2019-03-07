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
  tileClickedStatus: boolean[];
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
    this.boardArray = this.mineService.getMineArray();
    this.itemArray = new Array(this.mineService.boardSize * this.mineService.boardSize);
    this.tileClickedStatus = [];
    this.gameOver = false;
    this.gameStatus = '';
  }

  /**
   * Click handler -> uncovers the tile
   * @param index position of the clicked tile
   */
  clickTile(index) {
    // no click allowed if flag is set
    if (this.itemArray[index] === this.flagIcon || this.gameOver) {
      return false;
    }
    this.tileClickedStatus[index] = true;

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
        if (!this.tileClickedStatus[neighbors[i]]) {
          this.clickTile(neighbors[i]);
        }
      }
    }
  }

  /**
   * Marks/unmarks the tile with a flag, preventing/enabling click events
   * @param index position of the clicked tile
   */
  markTile(index) {
    const elem = this.itemArray[index];
    if (elem === undefined || elem === '') {
      this.itemArray[index] = this.flagIcon;
    } else if (elem === this.flagIcon) {
      this.itemArray[index] = '';
    }
    // prevent standard browser reaction to right mouse click:
    return false;
  }

}
