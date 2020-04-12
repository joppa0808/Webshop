import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;
  productForm: FormGroup;
  sub: any;
  currentId: number;
  loading = false;
  submitted = false;


  constructor(private productService: ProductService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.currentId = params.productId;
      this.productService.getProductById(this.currentId).subscribe(product => {
        console.log(product.productid)
        this.product = product;
      });
    });
    this.productForm = new FormGroup({
      productname: new FormControl(this.product.productname),
      price: new FormControl(this.product.price),
      imagepath: new FormControl(this.product.imagepath),
      productbeschrijving: new FormControl(this.product.productbeschrijving)
    });
    console.log('testtest');
    console.log(this.productForm.value + 'testtest');


  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    const data = JSON.parse(JSON.stringify(this.product)) as any;
    this.productService.updateProduct(data).subscribe(() => {
      this.router.navigate(['products']);
    });
  }

}
