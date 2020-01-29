import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Product} from '../model/product';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiService} from './api.service';
import {Item} from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient,
              private apiService: ApiService) {


  }

  getShoppingCartByUserId(userId: number): Observable<Item> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('joost:testtest')
      })
    };
    return this.http.get<Item>(environment.apiHostname + 'shopping-cart/' + userId, httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getProducts(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('joost:testtest')
      })
    };
    return this.http.get<Product>(environment.apiHostname + 'products', httpOptions)

      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // save(product: any): Observable<object> {
  //   return this.apiService.post('shoppingcarts', shoppingcart);
  // }

  delete(id: number) {
    const uri = 'products/';
    return this.apiService.delete<void>(uri + id);
  }

  // updateProduct(updatedProduct: Product): Observable<Product> {
  //   return this.apiService.put<Product>('products/' + updatedProduct.productid, updatedProduct);
  // }
}
