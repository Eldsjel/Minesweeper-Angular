import { Component, OnInit } from '@angular/core';
import { MineService } from '../mine.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  boardArray: number[];
  itemArray: string[];
  clickableTiles: number[];
  clickableTag = 'x';
  bannerStatus: string;
  mineIcon = 'assets/mine.ico';

  banner = 'assets/bunnybanner.jpg';
  bannerLost = 'assets/bunnylost.jpg';
  bannerWon = 'assets/bunnywon.jpg';

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
    this.clickableTiles = [];
    for (let i = 0; i < this.mineService.boardSize * this.mineService.boardSize; i++) {
      this.itemArray[i] = '';
    }
    this.bannerStatus = this.banner;
    this.itemArray[0] = this.clickableTag;
  }

  /**
   * Click handler -> uncovers the tile
   * @param index: position of the clicked tile
   */
  clickTile(index) {
    // no click allowed if clicked tile is not part of the path or if game is over
    if (this.bannerStatus !== this.banner || this.itemArray[index] !== this.clickableTag) {
      return false;
    }
    // initialize board array on first click
    if (this.boardArray.length === 0) {
      this.boardArray = this.mineService.getMineArray(index);
    }
    // check if a mine was clicked
    if (this.boardArray[index] === -1) {
      this.itemArray[index] = this.mineIcon;
      this.bannerStatus = this.bannerLost;
      return false;
    }
    this.itemArray[index] = 'assets/' + this.boardArray[index] + '.png';

    // check if carrot is reachable
    if (index === this.mineService.boardSize * this.mineService.boardSize - 1) {
      this.bannerStatus = this.bannerWon;
      return false;
    }
    // determine possible tiles for next step
    this.clickableTiles = this.mineService.getNeighbors(index);
    for (let i = 0; i < this.clickableTiles.length; i++) {
      if (this.itemArray[this.clickableTiles[i]] === '') {
        this.itemArray[this.clickableTiles[i]] = this.clickableTag;
      }
    }
  }

  /**
   * Disable right mouse click
   * @param index: position of the clicked tile
   */
  markTile(index) {
    return false;
  }
}
