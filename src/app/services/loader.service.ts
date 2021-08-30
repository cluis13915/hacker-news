import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  isLoading() {
    this.loading$.next(true);
  }

  notLoading() {
    this.loading$.next(false);
  }
}
