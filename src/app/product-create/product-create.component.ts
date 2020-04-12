import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AlertService} from '../service/alert.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product;

  createForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private router: Router
              ) {

  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      productname: ['', Validators.required],
      price: ['', [Validators.required]],
      imagepath: ['', [Validators.required]],
      productbeschrijving: ['', [Validators.required]]
    });
    this.createForm.setValue({productname: this.product.productname, price: this.product.price, imagepath: this.product.imagepath,
      productbeschrijving: this.product.productbeschrijving});
  }
  get f() {
    return this.createForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;
    this.productService.save(this.createForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.alertService.success('hi', true);
          this.router.navigate(['/products']);
        },
        error => {
          this.loading = false;
          this.alertService.error(error);
        });
  }
}
