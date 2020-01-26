import { environment } from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authenticationService';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable()
export class ApiService {


  constructor(private http: HttpClient, private authService: AuthenticationService) {

  }

  private createQueryString(queryParameters: Object): string {
    let queryString = '';

    if (typeof queryParameters === 'object') {
      for (const key in queryParameters) {
        const value = queryParameters[key];
        const prefix = queryString.length === 0 ? '?' : '&';

        queryString += `${prefix}${key}=${value}`;
      }
    } else if (typeof queryParameters === 'number' || typeof queryParameters === 'string') {
      queryString += '/' + queryParameters;
    } else {
      queryString = '';
    }

    return queryString;
  }

  public createURI(path: string, queryParameters: Object): string {
    const queryString = this.createQueryString(queryParameters);

    return `${environment.apiHostname}${path}${queryString}`;
  }

  private createRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.authService.hasAuthorization()) {
      headers = headers.set('Authorization', this.authService.createAuthorizationString())
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    }

    return headers;
  }

  /**
   * This is only for uploading files and images
   */
  private createRequestHeadersForUploadingFiles(): HttpHeaders {

    let headers = new HttpHeaders();

    if (this.authService.hasAuthorization()) {
      headers = headers.set('Authorization', this.authService.createAuthorizationString())
        .set('Accept', 'application/json');
    }

    return headers;
  }

  public get<T>(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();
    return this.http.get<Object>(uri, {headers: headers});
  }

  public getString(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();
    return this.http.get(uri, {headers: headers, responseType: 'text'});
  }

  public getFile<T>(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();
    return this.http.get(uri, {headers: headers, responseType: 'blob' as 'json'});
  }

  public post(path: string, object: Object, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const reqHeader = this.createRequestHeaders();

    return this.http.post(uri, object, {headers: reqHeader});
  }

  public postImageFile(path: string, object: Object, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const reqHeader = this.createRequestHeadersForUploadingFiles();

    return this.http.post(uri, object, {headers: reqHeader, responseType: 'text'});
  }

  public deleteImageFile(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const reqHeader = this.createRequestHeadersForUploadingFiles();

    return this.http.delete(uri, {headers: reqHeader, responseType: 'text'});
  }

  public put<T>(path: string, object: Object, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);

    const reqHeader = this.createRequestHeaders();

    return this.http.put(uri, object, {headers: reqHeader});
  }

  public delete<T>(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();
    console.log('in de api serv')
    return this.http.delete(uri, {headers: headers});
  }

  public extractData(res: Response) {
    const body = res;
    return body || { };
  }
}
