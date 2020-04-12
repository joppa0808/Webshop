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
    setTimeout(_ => {
      this.updateForm();
    }, 3000);
  }

  updateForm() {
    this.productForm = this.formBuilder.group({
      productname: [this.product.productname, Validators.required],
      price: [this.product.price, [Validators.required]],
      imagepath: [this.product.imagepath, [Validators.required]],
      productbeschrijving: [this.product.productbeschrijving, [Validators.required]]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    const result: Product = Object.assign({}, this.productForm.value);
    result.productid = this.product.productid;
    const data = JSON.parse(JSON.stringify(result)) as any;
    this.productService.updateProduct(data).subscribe(() => {
      console.log(data);
      this.router.navigate(['products']);
    });
  }

}
