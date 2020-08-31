export default class Seating {
  constructor(startingTime = "", maxNumOfTables = 15) {
    this.startingTime = startingTime;
    this.maxNumOfTables = maxNumOfTables; 
  };
  startingTime: string;
  maxNumOfTables: number;
}