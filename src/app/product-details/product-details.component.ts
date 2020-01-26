import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Product} from '../model/product';
import {AuthenticationService} from '../service/authenticationService';
import {ShoppingCartService} from '../service/shopping-cart.service';
import {ItemsService} from '../service/items.service';
import {Item} from '../model/item';
import {isArray} from 'util';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public currentId: number;
  product: Product;
  private sub: any;
  currentUser: any;
  private teller;
  private newItem;
  private shoppingcart: any = [];

  isDouble = false;

  private itemIsDouble: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              private itemService: ItemsService) {
    this.product = new Product();
    this.currentUser = this.authenticationService.getAuthenticator();

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.currentId = params.productId;
      this.productService.getProductById(this.currentId).subscribe(product => {
        this.product = product;
      });
    });
    this.teller = 1;
  }

  onDelete() {
    if (!confirm(`wilt u de product: "${this.product.productname}" verwijderen?`)) {
      return;
    }
    this.productService.delete(this.currentId).subscribe(() => {
        this.router.navigate(['products']);
      }
    );
  }

  onAddToShoppingCart(productid) {
    this.newItem = new Item(this.currentUser.uid, productid, this.teller);
    this.itemService.save(this.newItem).subscribe(data => {
      this.router.navigate(['/products']);
    });
  }

  notShop(productid) {
    this.isDouble = true;
  }

  checkElement(currentId) {
    this.itemService.getItemsByUserId(this.currentUser.uid).subscribe(data => {
      this.shoppingcart = data;
      let teller = 0;
      console.log(1);
      if (this.shoppingcart.length >= 1) {
        console.log(2);
        for (const item of this.shoppingcart) {
          teller += 1;
          if (2 * currentId === 2 * item.productid) {
            this.notShop(currentId);
          } else {
            this.onAddToShoppingCart(currentId);
          }
          console.log('hoi: ', item.productid);
        }
      } else {
        this.onAddToShoppingCart(currentId);
      }


    });
  }

  // this.itemService.getItemsByUserId(this.currentUser.uid).subscribe(data => {
  //   if (data) {
  //     for(let item of isArray(data)){
  //       if (item.productid === this.currentId) {
  //         console.log('ben double');
  //         this.itemIsDouble = true;
  //       } else {
  //         console.log('ben uniek');
  //         this.itemIsDouble = false;
  //       }
  //     }
  //
  //   } else {
  //     console.log('ben leeg');
  //   }
  // });

  onAdd() {
    this.teller += 1;
  }

  onRemove() {
    if (this.teller > 1) {
      this.teller -= 1;
    }
  }

}
