import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../service/items.service';
import {AuthenticationService} from '../service/authenticationService';
import {Product} from '../model/product';
import {ShoppingCartInfo} from '../model/shoppingCartInfo';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';
import {showRuleCrashWarning} from 'tslint/lib/error';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private shoppingcart: any = [];
  private user: any;
  public shoppingCartInfoList: ShoppingCartInfo [] = [];
  private shoppingCartInfo: ShoppingCartInfo;
  private product: Product;
  private totalPrice = 0;
  private showTotalWarning;
  private betaald;

  constructor(private itemsService: ItemsService,
              private authenticationService: AuthenticationService,
              private productService: ProductService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.user = this.authenticationService.getAuthenticator();
    this.itemsService.getItemsByUserId(this.user.uid).subscribe(data => {
      this.shoppingcart = data;

      for (const item of this.shoppingcart) {
        this.productService.getProductById(item.productid).subscribe(product => {
          this.product = product;
          this.shoppingCartInfo = new ShoppingCartInfo(this.product.productid, this.product.productname, this.product.price, item.quantity, this.product.imagepath);
          this.totalPrice += (this.product.price * item.quantity);
          this.shoppingCartInfoList.push(this.shoppingCartInfo);
        });
      }
    });
  }

  onClear(id) {
    if (this.shoppingCartInfoList.length >= 1) {
      this.itemsService.deleteByUser(id).subscribe(data => {
          if (confirm(`bedankt voor uw bestelling`)) {
            this.router.navigate(['products']);
          } else {
            window.location.reload();
          }
        }
      );
    } else {
      console.log('je shopping cart is leeg');
    }
  }

  paidColor() {
    document.getElementById('test1').style.backgroundColor = 'ForestGreen';
    document.getElementById('test2').style.backgroundColor = 'ForestGreen';
    this.betaald = true;
  }

  onAdd(productname) {
    for (const item of this.shoppingCartInfoList) {
      if (productname === item.productname) {
        if (item.quantity >= 1 && item.quantity <= 9) {
          item.quantity += 1;
          this.totalPrice += item.price;
        } else {
          this.showTotalWarning = true;
        }

      }
    }
  }

  onRemove(productname) {
    for (const item of this.shoppingCartInfoList) {
      if (productname === item.productname) {
        if (item.quantity === 10 ){
          this.showTotalWarning =false;
        }
        if (item.quantity > 1) {
          item.quantity -= 1;
          this.totalPrice -= item.price;
        }

      }
    }
  }

  onDelete(productid) {
    this.itemsService.deleteByUserAndProduct(this.user.uid, productid).subscribe(data => {
      window.location.reload();
    });

  }
}
