import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Product} from '../model/product';
import {AuthenticationService} from '../service/authenticationService';
import {ItemsService} from '../service/items.service';
import {Item} from '../model/item';

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
  teller;
  private newItem;
  private shoppingcart: any = [];



  public itemIsDouble: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              private itemService: ItemsService) {
    this.product = new Product();
    this.currentUser = this.authenticationService.getAuthenticator();

  }

  ngOnInit() {
    this.checkElement();
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

  public onAddToShoppingCart() {
    this.newItem = new Item(this.currentUser.uid, this.currentId, this.teller);
    this.itemService.save(this.newItem).subscribe(data => {
      this.router.navigate(['/products']);
    });
  }


  public checkElement() {
    this.itemService.getItemsByUserId(this.currentUser.uid).subscribe(data => {
      this.shoppingcart = data;
      if (this.shoppingcart.length * 2 / 2 > 0 && this.shoppingcart !== 'undefined') {
        for (const item of this.shoppingcart) {
          if (2 * this.currentId  === 2 * item.productid) {
            console.log('1')
            this.itemIsDouble = true;
            break;
          } else {
            this.itemIsDouble = false;
          }
          console.log('hoi: ', item.productid);
        }
      } else {
        this.itemIsDouble = false;
      }


    });
  }

  onAdd() {
    this.teller += 1;
  }

  onRemove() {
    if (this.teller > 1) {
      this.teller -= 1;
    }
  }

}
