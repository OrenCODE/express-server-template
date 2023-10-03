export class DatabaseError extends Error {
  public message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
