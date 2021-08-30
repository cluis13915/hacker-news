import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  host: string = environment.apiUrl;

  constructor(private http: HttpClient, private loader: LoaderService) { }

  get<T>(url: string, options: object = {}): Observable<T> {
    this.loader.isLoading();

    return this.http
      .get<T>(this.host + url, options)
      .pipe(
        tap(() => (this.loader.notLoading())),
        catchError((error) => {
          this.loader.notLoading();

          throw error;
        })
      );
  }

  post<T>(url: string, data: object = {}, options: object = {}): Observable<T> {
    this.loader.isLoading();

    return this.http
      .post<T>(this.host + url, data, options)
      .pipe(
        tap(() => (this.loader.notLoading())),
        catchError((error) => {
          this.loader.notLoading();

          throw error;
        })
      );
  }

  patch<T>(url: string, updates: object = {}, options: object = {}): Observable<T> {
    this.loader.isLoading();

    return this.http
      .patch<T>(this.host + url, updates, options)
      .pipe(
        tap(() => (this.loader.notLoading())),
        catchError((error) => {
          this.loader.notLoading();

          throw error;
        })
      );
  }

  delete<T>(url: string, options: object = {}): Observable<T> {
    this.loader.isLoading();

    return this.http
      .delete<T>(this.host + url, options)
      .pipe(
        tap(() => (this.loader.notLoading())),
        catchError((error) => {
          this.loader.notLoading();

          throw error;
        })
      );
  }
}
