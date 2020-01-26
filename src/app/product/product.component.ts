import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Product} from '../model/product';
import {User} from '../model/user';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../service/authenticationService';
import {UserService} from '../service/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public arrProducts: Product[] = [];
  currentUser: any;

  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.getAuthenticator();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.arrProducts = data;
    });


  }





}

