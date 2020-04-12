import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {AuthenticationService} from '../service/authenticationService';

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

