export default class Reservation {
  refId: number = 0;
  date: Date = new Date();
  time: string = "";
  seats: number = 0;
  guestId?: string = "";
}