export class User {
  id: number;
  email: string;
  password: string;
  token: string;


  constructor(id: number, email: string, password: string, token: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.token = token;
  }
  public getEmail(): string { return this.email; }
  public setEmail(email: string) { this.email = email; }
  public getPassword(): string { return this.password; }
  public setPassword(password: string) { this.password = password; }
}
