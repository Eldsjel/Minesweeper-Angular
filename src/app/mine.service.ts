import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor() { }

  numberOfMines = 10;
  boardSize = 8;
  mineArray: number[];

  static getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Initializes the game data
   */
  getMineArray(): number[] {
    const length = this.boardSize * this.boardSize;
    this.mineArray = new Array(length);

    // set up mines
    for (let i = 0; i < this.numberOfMines; i++) {
      let mineIndex = MineService.getRandomNumber(length);
      while (this.mineArray[mineIndex] === -1) {
        mineIndex = MineService.getRandomNumber(length);
      }
      this.mineArray[mineIndex] = -1;
    }

    // set up all other fields
    for (let i = 0; i < this.mineArray.length; i++) {
      if (this.mineArray[i] !== -1) {
        this.mineArray[i] = this.countAdjacentMines(i);
      }
    }
    return this.mineArray;
  }

  /**
   * Counts the number of mines in the neighborhood of a tile
   * @param index position of the tile
   */
  countAdjacentMines(index): number {
    let result = 0;
    const neighborList = this.getNeighbors(index);
    for (let i = 0; i < neighborList.length; i++) {
      if (this.mineArray[neighborList[i]] === -1) {
        result ++;
      }
    }
    return result;
  }

  /**
   * Gets all the neighboring tiles for a certain tile
   * @param index position of the tile
   */
  getNeighbors(index): number[] {
    const neighbors = [];
    if (index % this.boardSize !== 0) {
      // left neighbor
      neighbors.push(index - 1);
    }
    if (index % this.boardSize !== this.boardSize - 1) {
      // right neighbor
      neighbors.push(index + 1);
    }
    const upperNeighbor = index - this.boardSize;
    const lowerNeighbor = index + this.boardSize;
    if (upperNeighbor >= 0) {
      // upper neighbor
      neighbors.push(upperNeighbor);
      if (upperNeighbor % this.boardSize !== 0) {
        // upper left neighbor
        neighbors.push(upperNeighbor - 1);
      }
      if (upperNeighbor % this.boardSize !== this.boardSize - 1) {
        // upper right neighbor
        neighbors.push(upperNeighbor + 1);
      }
    }
    if (lowerNeighbor < this.boardSize * this.boardSize) {
      // lower neighbor
      neighbors.push(lowerNeighbor);
      if (lowerNeighbor % this.boardSize !== 0) {
        // upper left neighbor
        neighbors.push(lowerNeighbor - 1);
      }
      if (lowerNeighbor % this.boardSize !== this.boardSize - 1) {
        // upper right neighbor
        neighbors.push(lowerNeighbor + 1);
      }
    }
    for (let i = 0; i < neighbors.length; i++) {
      console.log('neighbor index: ' + neighbors[i]);
    }
    return neighbors;
  }
}
