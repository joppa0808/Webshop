import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './service/product.service';
import {Router} from '@angular/router';
import {User} from './model/user';
import {Subscription} from 'rxjs';
import {AuthenticationService} from './service/authenticationService';
import {UserService} from './service/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebshopAngularFrontend';
  public currentUser;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
  }

  // logout() {
  //   this.authenticationService.logout();
  //   this.router.navigate(['/login']);
  // }


}

