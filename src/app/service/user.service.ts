import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AuthenticationService} from './authenticationService';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})
export class UserService {
  newUser: User;

  constructor(
              private http: HttpClient,
              private router: Router,
              private authService: AuthenticationService,
              private apiService: ApiService) {
  }


  public login(user: User, remember: boolean) {

    this.authService.setAuthorization(user.getEmail(), user.getPassword());
    this.apiService.get<User>('users/me').subscribe
    (
      authenticator => {
        this.authService.storeAuthorization(authenticator, remember);
        console.log(authenticator)
        this.goHome();
      },
      error => {
        console.log('error')
        alert('Incorrect wachtwoord.');
      }
    );
  }

  public logout() {
    this.authService.deleteAuthorization();
    this.goHome();
  }

  public goHome() {
    this.router.navigate(['products']);
  }

  // private extractData(res: Response) {
  //   const body = res;
  //   return body || {};
  // }
  //
  // getEmptyUser() {
  //   return this.newUser = new User(null, '', '', null);
  // }
  //
  // getAll() {
  //   return this.http.get<User[]>(`${environment.apiHostname}users`);
  // }
  //
  // getById(id: number) {
  //   return this.http.get(`${environment.apiHostname}/users/${id}`);
  // }
  //
  post(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('test:testtest')
      })
    };
    return this.http.post(environment.apiHostname + 'users', user, httpOptions);
  }

  // update(user: User) {
  //   return this.http.put(`${environment.apiHostname}/users/${user.id}`, user);
  // }
  //
  // delete(id: number) {
  //   return this.http.delete(`${environment.apiHostname}/users/${id}`);
  // }
}
