import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;
  updateForm: FormGroup;
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
    this.updateForm = this.formBuilder.group({
      productname: ['', Validators.required],
      price: ['', [Validators.required]],
      imagepath: ['', [Validators.required]],
      productbeschrijving: ['', [Validators.required]]
    });
    this.updateForm.setValue({productname: this.product.productname, price: this.product.price, imagepath: this.product.imagepath,
      productbeschrijving: this.product.productbeschrijving});
    console.log(this.updateForm.value + 'testtest');
  }

  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {
    const data = JSON.parse(JSON.stringify(this.product)) as any;
    this.productService.updateProduct(data).subscribe(() => {
      this.router.navigate(['products']);
    });
  }

}
