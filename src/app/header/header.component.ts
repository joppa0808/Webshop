import {ChangeDetectionStrategy, Component, Injectable, Input, OnInit, Output} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authenticationService';
import {ItemsService} from '../service/items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  email: User;
  currentUser: any;
  isLoggedIn = false;
  shoppingcart = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private itemsService: ItemsService,
  ) {
  }

  public logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getAuthenticator();

    if (this.currentUser !== null) {
      this.isLoggedIn = true;
      this.getShoppingCartNumber();

    }

  }

  getShoppingCartNumber() {
    this.itemsService.getItemsByUserId(this.currentUser.uid).subscribe(data => {
      this.shoppingcart.push(data);
    });
  }
}
