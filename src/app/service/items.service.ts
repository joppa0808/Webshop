import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable, throwError} from 'rxjs';
import {Item} from '../model/item';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient,
              private apiService: ApiService) {


  }

  getItemsByUserId(userId: number): Observable<Item> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('joost:testtest')
      })
    };
    return this.http.get<Item>(environment.apiHostname + 'shoppingcarts/' + userId, httpOptions)
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

  save(item: object): Observable<object> {
    return this.apiService.post('shoppingcarts', item);
  }

  deleteByUserAndProduct(userid: number, productid: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('joost:testtest')
      })
    };
    const uri = 'shoppingcarts/';
    console.log(uri + userid + '/' + productid);
    return this.http.delete<void>(environment.apiHostname + uri + userid + '/' + productid, httpOptions);
  }

  deleteByUser(userid: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('joost:testtest')
      })
    };
    const uri = 'shoppingcarts/';
    console.log(environment.apiHostname + uri + userid);
    return this.http.delete<void>(environment.apiHostname + uri + userid, httpOptions);

  }
}
