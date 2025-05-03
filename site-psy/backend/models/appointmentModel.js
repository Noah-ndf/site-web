export const appointments = []; // temporaire en mémoire

export class Appointment {
  constructor({ id, userId, date, time, reason }) {
    this.id = id;
    this.userId = userId; // id du patient
    this.date = date;
    this.time = time;
    this.reason = reason;
  }
}
