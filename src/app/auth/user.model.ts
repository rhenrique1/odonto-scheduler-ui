export class User {
  constructor(
    public userId: string,
    public username: string,
    public tokenExpirationDate: Date,
    private _token: string,
  ) { }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
